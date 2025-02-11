const Cart = require("../models/cartModels");
const Product = require("../models/productModel");
//Add item to cart
//use the routes POST/api/cart
//accesibility is private
const addToCart = async(req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        //Validate product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product Not Found!" });

        //adding the bitem to the cart if the product is found

        const cartItem = new Cart({ userId, productId, quantity });
        await cartItem.save();

        res.status(201).json({ Success: true, cartItem });
    } catch (error) {
        res.status(500).json({ Success: false, message: "Server error", error });
    }
};

// get cart items
// route GET /api/cart
//access private

const getCartItems = async(req, res) => {
    try {
        const cartItem = await Cart.find({
            userId: req.user.id
        }).populate("productId");
        res.status(200).json({ Success: true, cartItem });
    } catch (error) {
        res.status(500).json({ Success: false, message: "Server Error", error });
    }
};

module.exports = { addToCart, getCartItems };