const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Define the User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/, "Please Enter Valid Email ID"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8, //minimum length of pwd 8
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

// Hash password before saving to database
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Only hash password if changed
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
});

// Compare entered password with stored hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);