import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/**
 * GET ALL PRODUCTS / FILTER BY CATEGORY
 */
export const getProducts = async (req, res) => {
  try {
    const category = req.query.category;

    let products;

    if (category) {
      products = await Product.find({
        category: { $regex: new RegExp(`^${category}$`, "i") },
      });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * CREATE PRODUCT (WITH CLOUDINARY IMAGE)
 */
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, countInStock } = req.body;

    // ✅ Image validation
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // 🔥 Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "stylecart/products",
    });

    const product = await Product.create({
      name,
      price,
      description,
      category,
      countInStock,
      image: result.secure_url, // ✅ Cloudinary URL
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
