const Joi = require('joi');

const objectId = Joi.string().pattern(/^[a-fA-F0-9]{24}$/);

const createUserSchema = Joi.object({
  fname: Joi.string().trim().min(1).max(50).required(),
  lname: Joi.string().trim().min(1).max(50).required(),
  username: Joi.string().trim().alphanum().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(128).required(),
  permission: Joi.string().valid('super_admin', 'admin', 'division_chief', 'admin_assistant', 'employee'),
  employee_id: Joi.string().trim().min(1).max(50).allow(null, '').optional(),
  division: objectId.allow(null, '').optional(),
  section: Joi.string().trim().min(1).max(100).allow(null, '').optional(),
});

const updateUserSchema = Joi.object({
  fname: Joi.string().trim().min(1).max(50),
  lname: Joi.string().trim().min(1).max(50),
  username: Joi.string().trim().alphanum().min(3).max(30),
  email: Joi.string().trim().email(),
  password: Joi.string().min(8).max(128),
  permission: Joi.string().valid('super_admin', 'admin', 'division_chief', 'admin_assistant', 'employee'),
  employee_id: Joi.string().trim().min(1).max(50).allow(null, ''),
  division: objectId.allow(null, ''),
  section: Joi.string().trim().min(1).max(100).allow(null, ''),
}).min(1);

module.exports = { createUserSchema, updateUserSchema };
