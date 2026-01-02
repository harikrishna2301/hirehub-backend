const Job = require("../models/Job");
const Application = require("../models/Application");

// POST JOB (Recruiter)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

// GET ALL JOBS (Public)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// APPLY FOR JOB (Candidate)
exports.applyJob = async (req, res) => {
  try {
    const existing = await Application.findOne({
      job: req.params.id,
      candidate: req.user.id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    await Application.create({
      job: req.params.id,
      candidate: req.user.id,
    });

    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: "Application failed" });
  }
};
