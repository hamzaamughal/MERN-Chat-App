const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/generateToken');
const User = require('../models/UserModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter all fields',
    });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      status: 'error',
      message: 'User already exists',
    });
  }
  const newUser = await User.create({ name, email, password, pic });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'User not created',
    });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter all fields',
    });
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Invalid credentials',
    });
  }
});

module.exports = { registerUser, authUser };
