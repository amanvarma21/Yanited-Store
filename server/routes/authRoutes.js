// Simple authentication API routes.
//
// This is intentionally lightweight for a college mini-project: users are kept
// in memory, there is no database, no JWT, and no password hashing. The main
// backend requirement is that PRODUCT data comes from Express. These endpoints
// exist so a REST auth flow can be demonstrated, but the existing React
// frontend keeps its localStorage-based auth so the UX is unchanged.

const express = require("express");
const router = express.Router();

// In-memory user store: { email, password }
const users = [];

// POST /api/auth/signup
router.post("/signup", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  users.push({ email, password });
  res.status(201).json({ success: true, user: { email } });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({ success: true, user: { email } });
});

module.exports = router;
