const Job = require("../models/Job");
const Application = require("../models/Application");

/* =========================
   CREATE JOB (Recruiter)
========================= */
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, type, applyLink } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      type,
      applyLink, // ✅ supports external apply
      createdBy: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error("Create Job Error:", err);
    res.status(500).json({ message: "Failed to create job" });
  }
};

/* =========================
   GET ALL JOBS (Public)
========================= */
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Get Jobs Error:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* =========================
   GET SINGLE JOB BY ID (Public)
========================= */
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("Get Job By ID Error:", err);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

/* =========================
   APPLY FOR JOB (Candidate)
   (Only INTERNAL jobs)
========================= */
exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 🚫 Block internal apply if external apply link exists
    if (job.applyLink) {
      return res.status(400).json({
        message: "This job requires external application",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: req.params.id,
      candidate: req.user.id,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You already applied for this job" });
    }

    await Application.create({
      job: req.params.id,
      candidate: req.user.id,
    });

    res.json({ message: "Applied successfully" });
  } catch (err) {
    console.error("Apply Job Error:", err);
    res.status(500).json({ message: "Failed to apply job" });
  }
};
