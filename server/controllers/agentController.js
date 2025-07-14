// server/controllers/agentController.js
import pool from '../config/db.js';
import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();

const clerkClient = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const updateToggle = async (req, res) => {
  const { id } = req.params;
  
    try {
      // Get current status
      const current = await pool.query(
        'SELECT is_active FROM packages WHERE id = $1',
        [id]
      );
  
      if (current.rows.length === 0) {
        return res.status(404).json({ error: 'Package not found' });
      }
  
      const currentStatus = current.rows[0].is_active;
      const newStatus = !currentStatus;
  
      // Update status
      const updated = await pool.query(
        'UPDATE packages SET is_active = $1 WHERE id = $2 RETURNING *',
        [newStatus, id]
      );
  
      res.json({ message: 'Status updated', data: updated.rows[0] });
    } catch (err) {
      console.error('Error updating status:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
}


export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM packages WHERE id = $1", [id]);
    res.json({ success: true, message: "Package deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting package:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const updatePackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const {
      title,
      destination,
      category,
      duration,
      price,
      description,
      itinerary,
      inclusions,
      exclusions,
      email,
      phone,
    } = req.body;

    // handle new uploads if provided
    const coverImage = req.files["cover_image"]?.[0]?.path || null;
    const itineraryImages = req.files["itinerary_images"]?.map((f) => f.path) || [];

    // fetch existing package to retain old image data if not updated
    const existing = await pool.query(`SELECT * FROM packages WHERE id = $1`, [packageId]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    const previous = existing.rows[0];

    const updated = await pool.query(
      `UPDATE packages SET
        title = $1,
        destination = $2,
        category = $3,
        duration = $4,
        price = $5,
        description = $6,
        itinerary = $7,
        inclusions = $8,
        exclusions = $9,
        email = $10,
        phone = $11,
        cover_image = $12,
        itinerary_images = $13,
        updated_at = NOW()
      WHERE id = $14
      RETURNING *`,
      [
        title,
        destination,
        category,
        duration,
        price,
        description,
        itinerary,
        inclusions,
        exclusions,
        email,
        phone,
        coverImage || previous.cover_image,
        itineraryImages.length > 0 ? itineraryImages : previous.itinerary_images,
        packageId,
      ]
    );

    return res.status(200).json({ success: true, data: updated.rows[0] });
  } catch (err) {
    console.error("❌ Error updating package:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getPackagesByAgent = async (req, res) => {
  try {
    const { clerk_user_id } = req.query;

    if (!clerk_user_id) {
      return res.status(400).json({ success: false, message: "Missing clerk_user_id" });
    }

    const result = await pool.query(
      `SELECT *
       FROM packages
       WHERE clerk_user_id = $1
       ORDER BY created_at DESC`,
      [clerk_user_id]
    );

    return res.status(200).json({ success: true, data: result.rows });
  } catch (err) {
    console.error("❌ Error fetching full package details:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const submitPackage = async (req, res) => {
  try {




    const {
      clerk_user_id,
      title,
      destination,
      category,
      duration,
      price,
      description,
      itinerary,
      inclusions,
      exclusions,
      email,
      phone,
    } = req.body;

    const { rows } = await pool.query(
      "SELECT * FROM agents WHERE clerk_user_id = $1",
      [clerk_user_id]
    );
    const agent_name = rows[0].full_name;
    const agency_name = rows[0].agency_name;
    // console.log(agency_name);

    const coverImage = req.files["cover_image"]?.[0]?.path || null;
    const itineraryImages = req.files["itinerary_images"]?.map((f) => f.path) || [];

    const query = `
  INSERT INTO packages (
    clerk_user_id,
    agent_name,
    title,
    destination,
    category,
    duration,
    price,
    description,
    itinerary,
    inclusions,
    exclusions,
    email,
    phone,
    cover_image,
    itinerary_images,
    agency_name
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14, $15, $16
  )
  RETURNING *;
`;


    const values = [
      clerk_user_id,
      agent_name,
      title,
      destination,
      category,
      duration,
      price,
      description,
      itinerary,
      inclusions,
      exclusions,
      email,
      phone,
      coverImage,
      itineraryImages,
      agency_name,
    ];
    console.log(values);

    const result = await pool.query(query, values);
    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error in submitPackage:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getAgentProfile = async (req, res) => {
  const { clerkUserId } = req.query;
  if (!clerkUserId) {
    return res.status(400).json({ message: "Missing Clerk User ID" });
  }
  try {
    const { rows } = await pool.query(
      "SELECT * FROM agents WHERE clerk_user_id = $1",
      [clerkUserId]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Agent not found" });
    // console.log(rows[0]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

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
