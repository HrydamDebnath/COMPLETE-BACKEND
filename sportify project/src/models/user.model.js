const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "artist"],
        default: "user"
    }
}, );

// Change this line in user.model.js:
const userModel = mongoose.model('User', userSchema, 'spotify'); 

module.exports = userModel;