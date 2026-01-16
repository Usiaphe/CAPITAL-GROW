const express = require('express');
const router = express.Router();
const cors = require('cors');

const { test, registerUser, loginUser, getProfile } = require('../controllers/authController');

// optional: CORS already applied in index.js
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

// test route
router.get('/', test);

// register route
router.post('/register', registerUser);

// login route
router.post('/login', loginUser);

// profile route (FIXED path + function name)
router.get('/profile', getProfile);

// previous test code commented out
router.post('/register', (req, res) => {
  res.send('register route works');
});

module.exports = router;