// server/routes/agent.js
import express from 'express';
import multer from 'multer';
import { onboardAgent, getAgentProfile,  submitPackage, getPackagesByAgent, updatePackage, deletePackage, updateToggle } from '../controllers/agentController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });




router.put('/updateStatus/:id', updateToggle);





router.post(
  '/onboarding',
  upload.fields([
    { name: 'idProof', maxCount: 1 },
    { name: 'businessCert', maxCount: 1 },
  ]),
  onboardAgent
);

router.get("/profile", getAgentProfile);


router.post(
  "/submitPackage",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "itinerary_images", maxCount: 10 },
  ]),
  submitPackage
);

router.get('/getPackages', getPackagesByAgent);

router.put(
  '/updatePackage/:packageId',
  upload.fields([
    { name: 'cover_image', maxCount: 1 },
    { name: 'itinerary_images', maxCount: 10 },
  ]),
  updatePackage
);

router.delete("/deletePackage/:id", deletePackage);

export default router;
