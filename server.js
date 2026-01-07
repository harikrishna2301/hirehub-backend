const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 🔹 IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

/* ================================
   ✅ CORS CONFIG (VERY IMPORTANT)
================================ */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://elegant-clafoutis-649015.netlify.app", // LIVE frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ================================
   🔹 API ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================================
   🔹 HEALTH CHECK
================================ */
app.get("/", (req, res) => {
  res.send("HireHub Backend Running 🚀");
});

/* ================================
   🔹 DATABASE + SERVER
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err.message));
