const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Make sure to require jwt at the top!

router.post("/create", (req, res) => {
    // 1. Grab the token from incoming cookies
    const token = req.cookies.token;

    // 2. If no token exists, block them with a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    // 3. Verify if the token is valid or altered
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // If the token is fake, expired, or tampered with
        if (err) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        
        // 4. Token is 100% valid! Proceed with creating the post
        // (You can also access the user ID here using decoded.id if needed)
        res.send("Post created successfully");
    });
});

module.exports = router;