const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Test whether the backend is running.
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running!",
  });
});

// Receive contact form submissions.
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide your name, email, and message.",
    });
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({
      success: false,
      message: "One or more fields exceed the allowed length.",
    });
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  // Development-only: submissions are logged in the terminal.
  console.log("New portfolio contact:", {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    message: "Thanks! Your message was received.",
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
});