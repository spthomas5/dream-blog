const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill out all fields');
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        console.log(userExists);
        throw new Error('A user with this email already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201);
    res.json({
        token: createToken(user.id)
    })


})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new Error('Please enter all fields');
    }

    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200);
        res.json({
            token: createToken(user.id)
        })
    }
    else {
        res.status(400);
        throw new Error('Incorrect credentials');
    }
    
})

const getMe = asyncHandler(async (req, res) => {
    res.json(req.user)
})

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});

}

module.exports = {
    registerUser,
    loginUser,
    getMe
}