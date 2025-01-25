const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust path to your User model
const customError = require('../utils/customError')


// Login function to generate JWT
async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.getUserByEmail(email); // Adjust for your ORM (e.g., Prisma)

    if (!user) {
      return next(new customError("User not found", 404,{email:"User not found"}))
    }

    const username = user.username;

    if (!(await bcrypt.compare(password, user.password))) {
      return next(new customError("Invalid credentials", 401, {password:"Invalid credentials"}))
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token , username });
  } catch (error) {
    console.log(error)
    next(new customError("Server error", 500))
  }
};


async function register(req, res, next) {
  const { username, email, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.createUser({ username, email, password: hashedPassword }); // Adjust for your ORM (e.g., Prisma)

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
}

async function verifyToken(req, res, next) {
  const { token } = req.body;

  try {
    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    next(new customError("Invalid token", 401))
  }
}

module.exports = { login, register, verifyToken };
