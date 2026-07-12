require('dotenv').config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// Start server only after a successful DB connection
connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Failed to start server due to DB error:", err.message);
        process.exit(1); 
    });