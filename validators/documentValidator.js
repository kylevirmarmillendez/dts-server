const Joi = require('joi');

const DOCUMENT_TYPES = ['Service Order', 'Memorandum', 'DTR', 'Accomplishment Report', 'Other'];

const createDocumentSchema = Joi.object({
  document_name: Joi.string().trim().min(1).max(200).required(),
  version: Joi.string().trim().min(1).max(50).allow(null, '').optional(),
  description: Joi.string().trim().max(2000).allow('', null).optional(),
  document_type: Joi.string().valid(...DOCUMENT_TYPES).required(),
});

const updateDocumentSchema = Joi.object({
  document_name: Joi.string().trim().min(1).max(200),
  version: Joi.string().trim().min(1).max(50),
  feedback: Joi.string().trim().max(1000).allow('', null),
  description: Joi.string().trim().max(2000).allow('', null),
  document_type: Joi.string().valid(...DOCUMENT_TYPES),
}).min(1);

module.exports = { createDocumentSchema, updateDocumentSchema };
