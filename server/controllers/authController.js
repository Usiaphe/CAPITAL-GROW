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

        // check if name was entered
        if (!name) {
            return res.json({ error: 'name is required' });
        }

        // check if password is valid
        if (!password || password.length < 8) {
            return res.json({
                error: 'password is required and should be at least 8 characters long'
            });
        }

        // check if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email is already taken' });
        }

        // hash password
        const hashedPassword = await hashPassword(password);

        // create user in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // return created user (optional: exclude password for security)
        return res.json(user);

    } catch (error) {
        console.log(error);
    }
};

// login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        // check if password matches
        const match = await comparePassword(password, user.password);

        // if password matches
        if (match) {
            // create JWT
            jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    name: user.name
                },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;

                    // store token in cookie
                    res.cookie('token', token).json(user);
                }
            );
        }

        // if password does not match
        if (!match) {
            return res.json({ error: 'Password is incorrect' });
        }

    } catch (error) {
        console.log(error);
    }
};

// profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;

            // return user from JWT
            res.json(user);
        });
    } else {
        // no token → not logged in
        res.json(null);
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile, // FIXED function name
};