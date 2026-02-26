const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

const router = express.Router();

// ================= ADMIN CHECK =================
const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

// ================= GET ALL USERS =================
router.get("/users", auth, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= GET ALL TRANSACTIONS (ADMIN) =================
router.get("/all-transactions", auth, verifyAdmin, async (req, res) => {
  try {
    const items = await Transaction.find()
      .populate("user", "email username")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= UPDATE USER ROLE =================
router.put("/users/:id/role", auth, verifyAdmin, async (req, res) => {
  try {
    const { isAdmin } = req.body;

    if (typeof isAdmin !== "boolean") {
      return res.status(400).json({ message: "isAdmin must be true or false" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.json({ message: "User role updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= CHANGE ADMIN PASSWORD =================
router.put("/settings", auth, verifyAdmin, async (req, res) => {
  try {
    const { current, password } = req.body;

    if (!current || !password) {
      return res.status(400).json({ message: "Both current and new password required" });
    }

    const admin = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(current, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;