import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

console.log("✅ paymentRoutes loaded");

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("REQ BODY:", req.body);

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ Razorpay env missing");
      return res.status(500).json({ message: "Razorpay keys missing" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: numericAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("✅ ORDER CREATED:", order.id);

    res.json(order);
  } catch (error) {
    console.error("❌ RAZORPAY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
