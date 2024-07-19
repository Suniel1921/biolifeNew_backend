const userAuthModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const JWT = require ('jsonwebtoken');
require('dotenv').config();

// register controller
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // check if user exists
        const userExists = await userAuthModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // hash user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save new user in database
        const newUser = await userAuthModel.create({ name, email, password: hashedPassword });
        return res.status(201).json({ success: true, message: 'User registration successful', newUser });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//login controller

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email or Password is required' });
        }

        // Check if user exists
        const userExists = await userAuthModel.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ success: false, message: 'Invalid Credentials' });
        }

        // Check password
        const isMatchPassword = await bcrypt.compare(password, userExists.password);
        if (!isMatchPassword) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        // Generate token
        const token = JWT.sign({ _id: userExists._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
        return res.status(200).json({ success: true, message: 'Login Successful', user: { name: userExists.name, email: userExists.email }, token });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};



// Protected route controller
exports.protectedRoute = async (req, res) => {
    res.status(200).send({ ok: true });
}

// Admin route controller
exports.admin = (req, res) => {
  res.status(200).send({ ok: true });
}
