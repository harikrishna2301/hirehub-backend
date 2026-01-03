const Job = require("../models/Job");
const Application = require("../models/Application");

/**
 * RECRUITER DASHBOARD
 */
exports.getRecruiterDashboard = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("user", "name email")
      .populate("job", "title company");

    res.json({
      totalJobs: jobs.length,
      totalApplications: applications.length,
      applications,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
};

/**
 * CANDIDATE DASHBOARD
 */
exports.getCandidateDashboard = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).populate("job", "title company location");

    res.json({
      totalApplied: applications.length,
      applications,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
};
