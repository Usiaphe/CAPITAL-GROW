import express from "express";
import User from "../models/User.js";
import { clerk } from "../clerk.js";

const router = express.Router();

// Register user in MongoDB after Clerk signup
router.post("/register", async (req, res) => {
  try {
    const { clerkId, fullName, email } = req.body;

    const existing = await User.findOne({ clerkId });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ clerkId, fullName, email });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch user info for dashboard
router.get("/me/:clerkId", async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;