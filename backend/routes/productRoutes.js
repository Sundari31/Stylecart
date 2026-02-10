import express from "express";
import {
  getProducts,
  addProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, addProduct);

export default router;
