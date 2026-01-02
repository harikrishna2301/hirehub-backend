const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 🔹 IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes"); // ✅ ADD THIS
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 USE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes); // ✅ ADD THIS
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("HireHub Backend Running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.error(err.message));
