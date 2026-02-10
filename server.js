import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env FIRST
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Create app BEFORE using it
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ EXPOSE uploads folder (THIS FIXES IMAGES)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// HARD CHECK (temporary)
console.log("ENV TEST =>", {
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
});

// DB
import connectDB from "./config/db.js";
connectDB();

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("StyleCart Backend is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
