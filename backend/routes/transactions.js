const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// Get transactions - if admin, return all; otherwise user's only
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const items = await Transaction.find().populate('user', 'username email');
      return res.json(items);
    }
    const items = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create
router.post('/', auth, async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    const tx = new Transaction({ user: req.user._id, amount, type, category, description, date });
    await tx.save();
    res.json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete (owner or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: 'Not found' });

    if (!req.user.isAdmin && String(tx.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await tx.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
