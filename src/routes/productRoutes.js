const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { create } = require('../models/productModel');
//define a GET route for products
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);
router.post("/", protect, createProduct); //Only Admin
router.get("/:id", protect, updateProduct); //Only Admin
router.get("/:id", protect, deleteProduct); //Only Admin

module.exports = router;