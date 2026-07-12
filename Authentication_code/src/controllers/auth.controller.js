const userModel = require("../MODELS/model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;


        // Check if EITHER the email OR the username is already taken
const isUserAlreadyExists = await userModel.findOne({
    $or: [
        { email: email },
        { username: username }
    ]
});

if (isUserAlreadyExists) {
    return res.status(409).json({
        message: "Username or Email already exists"
    });
}

        // Creates a new user in the database
        const user = await userModel.create({ username, email, password });

        // Generates a JSON Web Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: '1h' });


        res.cookie("token", token);


        res.status(201).json({
            message: "User registered successfully",
            user
         
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
}

module.exports = { registerUser };