const express = require('express'); //imports express dependencies
const dotenv = require('dotenv'); //imports dotenv dependencies
const cors = require("cors"); // cors dependency
const connectDB = require("./src/config/db"); //DB connection
const productRoutes = require("./src/routes/productRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const userRoutes = require('./src/routes/users');
const authRoutes = require("./src/routes/authRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use('/users', userRoutes);
//app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/wishlist", require("./src/routes/wishlistRoutes"));
app.get('/', (req, res) => {

    res.send("Server is Running");
});
const PORT = process.env.PORT;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });
});