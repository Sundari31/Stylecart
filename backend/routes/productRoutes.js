import express from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getProducts);

// CREATE PRODUCT (ADMIN + IMAGE UPLOAD)
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  createProduct
);

export default router;
