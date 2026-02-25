const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
const articleRoutes = require("./routes/articleRoute");
const aiRoutes = require("./routes/aiRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;