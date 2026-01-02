const express = require("express");
const {
  createJob,
  getJobs,
  applyJob,
} = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", auth, role("recruiter"), createJob);
router.get("/", getJobs);
router.post("/:id/apply", auth, role("candidate"), applyJob);

module.exports = router;
