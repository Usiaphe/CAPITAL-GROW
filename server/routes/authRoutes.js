const express = require('express');
const router = express.Router();
const cors = require('cors');
const { requireAuth, requireAdmin } = require('../middleware/requireAuth');

const {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getAllUsers,
    getUserById,
    deleteUser,
    toggleAdmin,
} = require('../controllers/authController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

// public routes
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

// admin routes (require auth + admin)
router.get('/admin/users', requireAuth, requireAdmin, getAllUsers);
router.get('/admin/users/:id', requireAuth, requireAdmin, getUserById);
router.delete('/admin/users/:id', requireAuth, requireAdmin, deleteUser);
router.put('/admin/users/:id/toggle-admin', requireAuth, requireAdmin, toggleAdmin);

module.exports = router;
