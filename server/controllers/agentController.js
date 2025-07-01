// server/controllers/agentController.js
import pool from '../config/db.js';
import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();

const clerkClient = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const onboardAgent = async (req, res) => {
  const {
    fullName,
    agencyName,
    email,
    mobile,
    address,
    gstin,
    bankAccountNo,
    ifsc,
    clerkUserId, // ✅ Get this from frontend
  } = req.body;

  const idProofPath = req.files['idProof']?.[0]?.path;
  const businessCertPath = req.files['businessCert']?.[0]?.path;

  try {
    const result = await pool.query(
      `INSERT INTO agents
        (full_name, agency_name, email, mobile, address, gstin, bank_account_no, ifsc, id_proof_path, business_cert_path, clerk_user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        fullName,
        agencyName,
        email,
        mobile,
        address,
        gstin,
        bankAccountNo,
        ifsc,
        idProofPath,
        businessCertPath,
        clerkUserId, // ✅ store this
      ]
    );

    if (clerkUserId) {
      await clerkClient.users.updateUser(clerkUserId, {
        publicMetadata: { agentOnboarded: true },
      });
    }

    res.status(201).json({ success: true, agent: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error saving data' });
  }
};
