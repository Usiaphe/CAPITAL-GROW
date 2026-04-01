const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// test route
const test = (req, res) => {
    res.json('test is working');
};

// register endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.json({ error: 'Name is required' });
        }

        if (!password || password.length < 8) {
            return res.json({
                error: 'Password is required and should be at least 8 characters long'
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email is already taken' });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.json({ name: user.name, email: user.email });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.json({ error: 'Password is incorrect' });
        }

        // create JWT with role info
        jwt.sign(
            {
                email: user.email,
                id: user._id,
                name: user.name,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                }).json({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                });
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) return res.json(null);
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

// logout endpoint
const logoutUser = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(0),
    }).json({ message: 'Logged out successfully' });
};

// admin: get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// admin: get single user
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// admin: delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// admin: toggle admin status
const toggleAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.isAdmin = !user.isAdmin;
        await user.save();
        res.json({ message: `User is now ${user.isAdmin ? 'an admin' : 'a regular user'}`, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getAllUsers,
    getUserById,
    deleteUser,
    toggleAdmin,
};
