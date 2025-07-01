// server/routes/agent.js
import express from 'express';
import multer from 'multer';
import { onboardAgent } from '../controllers/agentController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post(
  '/onboarding',
  upload.fields([
    { name: 'idProof', maxCount: 1 },
    { name: 'businessCert', maxCount: 1 },
  ]),
  onboardAgent
);

export default router;
