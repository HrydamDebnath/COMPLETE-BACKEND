const express = require('express');
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.registerUser);
router.get("/test", (req, res) => {

res.json({ message: "Test route accessed", cookies: req.cookies })
});
module.exports = router; 