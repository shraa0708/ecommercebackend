const express = require("express");
const { addToCart, getCartItems } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", protect, addToCart);
router.get("/", protect, getCartItems);

module.exports = router;