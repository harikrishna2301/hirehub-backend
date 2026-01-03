const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  getRecruiterDashboard,
  getCandidateDashboard,
} = require("../controllers/dashboardController);

// Recruiter dashboard
router.get("/recruiter", auth, getRecruiterDashboard);

// Candidate dashboard
router.get("/candidate", auth, getCandidateDashboard);

module.exports = router;
