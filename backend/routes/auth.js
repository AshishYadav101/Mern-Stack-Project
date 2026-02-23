const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail } = require('../utils/sendEmail');

// ================= REGISTER =================
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false // 🚨 Never allow frontend to set admin
    });

    await user.save();

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET not set in .env' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ================= LOGIN =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET not set in .env' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= FORGOT PASSWORD =================
// Check if email exists; if yes, set a temporary password and send it to that email.
// (We cannot send the "old" password because it is stored hashed.)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const emailNorm = email.trim();
    const user = await User.findOne({ email: new RegExp(`^${emailNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') });
    if (!user) {
      return res.status(400).json({ message: 'Account does not exist' });
    }

    // Generate temporary password (8 chars, alphanumeric)
    const tempPassword = crypto.randomBytes(4).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);
    user.password = hashedPassword;
    await user.save();

    const emailBody = `Your Tracky temporary password is: ${tempPassword}\n\nPlease login with this password and change it from Settings.`;
    const emailHtml = `<p>Your Tracky temporary password is: <strong>${tempPassword}</strong></p><p>Please login with this password and change it from Settings.</p>`;

    const result = await sendEmail({
      to: user.email,
      subject: 'Tracky – Your temporary password',
      text: emailBody,
      html: emailHtml,
    });

    if (!result.sent) {
      console.log('Email not configured. Temporary password for', user.email, ':', tempPassword);
    }

    return res.status(200).json({
      message: `Password sent successfully to ${user.email}`,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;