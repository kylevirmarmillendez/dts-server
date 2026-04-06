const Joi = require('joi');

const createUserSchema = Joi.object({
  fname: Joi.string().trim().min(1).max(50).required(),
  lname: Joi.string().trim().min(1).max(50).required(),
  username: Joi.string().trim().alphanum().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(128).required(),
  permission: Joi.string().valid('admin', 'user', 'viewer'),
});

const updateUserSchema = Joi.object({
  fname: Joi.string().trim().min(1).max(50),
  lname: Joi.string().trim().min(1).max(50),
  username: Joi.string().trim().alphanum().min(3).max(30),
  email: Joi.string().trim().email(),
  password: Joi.string().min(8).max(128),
  permission: Joi.string().valid('admin', 'user', 'viewer'),
}).min(1);

module.exports = { createUserSchema, updateUserSchema };
