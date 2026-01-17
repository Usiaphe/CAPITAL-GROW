const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); // FIXED import
const cookieParser = require('cookie-parser');

const app = express();

// database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('database connected'))
  .catch(err => console.log('database not connected', err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// CORS middleware (REQUIRED for cookies)
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

// routes
app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));

