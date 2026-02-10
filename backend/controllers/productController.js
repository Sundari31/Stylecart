import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    console.log("QUERY PARAM:", req.query.category);

    const category = req.query.category;

    let products;

    if (category) {
      products = await Product.find({
        category: { $regex: new RegExp(`^${category}$`, "i") },
      });
    } else {
      products = await Product.find();
    }

    console.log("PRODUCTS COUNT:", products.length);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    console.log("USER IN ORDER:", req.user); // 🔍 DEBUG

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
