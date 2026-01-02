const Job = require("../models/Job");
const Application = require("../models/Application");

/**
 * ================================
 * RECRUITER DASHBOARD
 * ================================
 * Shows:
 * - Jobs posted by recruiter
 * - All candidates who applied
 */
exports.getRecruiterDashboard = async (req, res) => {
  try {
    // 1. Find jobs created by recruiter
    const jobs = await Job.find({ createdBy: req.user.id });

    // 2. Get job IDs
    const jobIds = jobs.map((job) => job._id);

    // 3. Find applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("candidate", "name email")
      .populate("job", "title company");

    res.json({
      totalJobs: jobs.length,
      totalApplications: applications.length,
      applications,
    });
  } catch (err) {
    console.error("Recruiter Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};

/**
 * ================================
 * CANDIDATE DASHBOARD
 * ================================
 * Shows:
 * - Jobs the candidate applied for
 */
exports.getCandidateDashboard = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    }).populate("job", "title company location");

    res.json({
      totalApplied: applications.length,
      applications,
    });
  } catch (err) {
    console.error("Candidate Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
