const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createUserSchema, updateUserSchema } = require('../validators/userValidator');

const success = (res, statusCode, data, message) =>
  res.status(statusCode).json({ success: true, message, data });

const failure = (res, statusCode, message, errors = null) =>
  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });

// ── Controllers ───────────────────────────────────────────────────────────────

const createUser = async (req, res) => {
  const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return failure(res, 400, 'Validation failed.', errors);
  }

  const { fname, lname, username, email, password, permission, employee_id, division, section } = value;

  const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }, { employee_id }] });
  if (existingUser) {
    const field = existingUser.email === email.toLowerCase() ? 'email' : existingUser.username === username ? 'username' : 'employee_id';
    return failure(res, 409, `A user with that ${field} already exists.`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ fname, lname, username, email, password: hashedPassword, permission, employee_id, division, section });

  const { password: _pw, ...userResponse } = user.toObject();

  return success(res, 201, userResponse, 'User created successfully.');
};

const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  return success(res, 200, users, 'Users retrieved successfully.');
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return failure(res, 404, 'User not found.');
  }
  return success(res, 200, user, 'User retrieved successfully.');
};

const updateUser = async (req, res) => {
  const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return failure(res, 400, 'Validation failed.', errors);
  }

  const { fname, lname, username, email, password, permission, employee_id, division, section } = value;

  const user = await User.findById(req.params.id);
  if (!user) {
    return failure(res, 404, 'User not found.');
  }

  if (username && username !== user.username) {
    const taken = await User.findOne({ username });
    if (taken) return failure(res, 409, 'Username already taken.');
    user.username = username;
  }

  if (email && email.toLowerCase() !== user.email) {
    const taken = await User.findOne({ email: email.toLowerCase() });
    if (taken) return failure(res, 409, 'Email already taken.');
    user.email = email;
  }

  if (employee_id && employee_id !== user.employee_id) {
    const taken = await User.findOne({ employee_id });
    if (taken) return failure(res, 409, 'Employee ID already taken.');
    user.employee_id = employee_id;
  }

  if (fname) user.fname = fname;
  if (lname) user.lname = lname;
  if (permission) user.permission = permission;
  if (division) user.division = division;
  if (section) user.section = section;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();

  const { password: _pw, ...userResponse } = user.toObject();
  return success(res, 200, userResponse, 'User updated successfully.');
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return failure(res, 404, 'User not found.');
  }
  return success(res, 200, null, 'User deleted successfully.');
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
