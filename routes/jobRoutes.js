const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  applyJob,
} = require("../controllers/jobController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

/* =========================
   PUBLIC ROUTES
========================= */

// Get all jobs
router.get("/", getJobs);

// Get single job by ID  ✅ MUST COME BEFORE /:id/apply
router.get("/:id", getJobById);

/* =========================
   PROTECTED ROUTES
========================= */

// Create job (Recruiter only)
router.post("/", auth, role("recruiter"), createJob);

// Apply for job (Candidate only)
router.post("/:id/apply", auth, role("candidate"), applyJob);

module.exports = router;
