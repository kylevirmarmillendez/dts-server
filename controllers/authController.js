const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const failure = (res, statusCode, message) =>
  res.status(statusCode).json({ success: false, message });

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return failure(res, 400, 'Username and password are required.');
  }

  const user = await User.findOne({ username });
  if (!user) {
    return failure(res, 401, 'Invalid credentials.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return failure(res, 401, 'Invalid credentials.');
  }

  const payload = {
    id: user._id,
    username: user.username,
    permission: user.permission,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

  return res.status(200).json({
    success: true,
    message: 'Login successful.',
    token,
    user: {
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      permission: user.permission,
    },
  });
};

module.exports = { login };
