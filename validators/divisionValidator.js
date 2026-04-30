const Joi = require('joi');

const OBJECT_ID = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

const createDivisionSchema = Joi.object({
  division_name: Joi.string().trim().min(1).max(200).required(),
  division_code: Joi.string().trim().min(1).max(50).required(),
  division_chief: OBJECT_ID.allow(null).optional(),
});

const updateDivisionSchema = Joi.object({
  division_name: Joi.string().trim().min(1).max(200),
  division_code: Joi.string().trim().min(1).max(50),
  division_chief: OBJECT_ID.allow(null).optional(),
}).min(1);

module.exports = { createDivisionSchema, updateDivisionSchema };
