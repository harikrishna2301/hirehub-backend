const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  getRecruiterDashboard,
  getCandidateDashboard,
} = require("../controllers/dashboardController");

const router = express.Router();

// Recruiter dashboard
router.get("/recruiter", auth, role("recruiter"), getRecruiterDashboard);

// Candidate dashboard
router.get("/candidate", auth, role("candidate"), getCandidateDashboard);

module.exports = router;
