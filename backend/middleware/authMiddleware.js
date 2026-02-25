
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  console.log("Full Authorization Header:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];
  console.log("Extracted Token:", token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  console.log("Verifying with secret:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Payload:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};