import express from "express";
import User from "../models/User.js";
import { requireAuth } "../../backend/Middleware/requireAuth.js";

const router = express.Router();

/**
 * REGISTER USER (called AFTER Clerk signup)
 */
router.post("/register", async (req, res) => {
  try {
    const { clerkId, fullName, email } = req.body;

    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      clerkId,
      fullName,
      email,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET LOGGED-IN USER (dashboard)
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;