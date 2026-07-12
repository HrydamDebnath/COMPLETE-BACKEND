require("dotenv").config();
const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first"); //  Forces Node to prioritize IPv4 DNS lookups

const app = require("./src/app");
const connectDB = require("./src/db/db");

async function startServer() {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (err) {
        console.error("Server failed to start:", err);
    }
}

startServer();