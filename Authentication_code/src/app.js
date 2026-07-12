const express = require('express');
const app = express();
const postRoutes = require("./routes/post.routes");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser()); // FIX: Moved ABOVE the routes

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/posts", require("./routes/post.routes"));
module.exports = app;