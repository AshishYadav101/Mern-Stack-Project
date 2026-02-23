require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const txRoutes = require('./routes/transactions');
const adminRoutes = require('./routes/admin.routes'); // ✅ fixed

const app = express(); // ✅ create app FIRST

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Test Route
app.get('/', (req, res) =>
  res.send({ ok: true, message: 'Expense Tracker API' })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', txRoutes);
app.use('/api/admin', adminRoutes); // ✅ moved below app creation

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);