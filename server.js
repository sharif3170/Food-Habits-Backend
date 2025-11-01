import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

// Import routes
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();

// =======================
// 📌 CORS Configuration
// =======================
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// =======================
// 📌 MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to FoodHabits DB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// =======================
// 📌 Mongoose Models
// =======================

// Import User model
import User from "./models/user.js";

// Import Message model
import Message from "./models/message.js";

// =======================
// 📌 Utility Functions
// =======================

// =======================
// 📌 Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// =======================
// 📌 Health Check Route
// =======================
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "FoodHabits API is running" });
});

// =======================
// 📌 Server Start
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));