const Joi = require('joi');

const DIVISIONS = [
  'Office of the Regional Director',
  'Office of the Assistant Regional Director for Operation',
  'Office of the Assistant Regional Director for Administration',
  'Policy and Plans Division',
  'Innovations Division',
  'Financial Management Division',
  'Administrative Division',
  'Human Resources Management Development Division',
  'Protective Services Division',
  'Promotive Services Division',
  'Pantawid Pamilyang Pilipino Program',
  'Disaster Response and Management Division',
];

const createUserSchema = Joi.object({
  fname: Joi.string().trim().min(1).max(50).required(),
  lname: Joi.string().trim().min(1).max(50).required(),
  username: Joi.string().trim().alphanum().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(128).required(),
  permission: Joi.string().valid('super_admin', 'admin', 'user', 'viewer'),
  employee_id: Joi.string().trim().min(1).max(50).allow(null, '').optional(),
  division: Joi.string().valid(...DIVISIONS).allow(null, '').optional(),
  section: Joi.string().trim().min(1).max(100).allow(null, '').optional(),
});

const updateUserSchema = Joi.object({
  fname: Joi.string().trim().min(1).max(50),
  lname: Joi.string().trim().min(1).max(50),
  username: Joi.string().trim().alphanum().min(3).max(30),
  email: Joi.string().trim().email(),
  password: Joi.string().min(8).max(128),
  permission: Joi.string().valid('super_admin', 'admin', 'user', 'viewer'),
  employee_id: Joi.string().trim().min(1).max(50).allow(null, ''),
  division: Joi.string().valid(...DIVISIONS).allow(null, ''),
  section: Joi.string().trim().min(1).max(100).allow(null, ''),
}).min(1);

module.exports = { createUserSchema, updateUserSchema };
