const Document = require('../models/Document');
const { createDocumentSchema, updateDocumentSchema } = require('../validators/documentValidator');

const success = (res, statusCode, data, message) =>
  res.status(statusCode).json({ success: true, message, data });

const failure = (res, statusCode, message, errors = null) =>
  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });

// ── Controllers ───────────────────────────────────────────────────────────────

const createDocument = async (req, res) => {
  const { error, value } = createDocumentSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return failure(res, 400, 'Validation failed.', errors);
  }

  const { document_name, version, description, document_type } = value;

  const document = await Document.create({
    document_name,
    version: version || null,
    description: description || null,
    document_type,
    owner: req.user.id,
  });

  const populated = await document.populate('owner', 'fname lname username employee_id');

  return success(res, 201, populated, 'Document created successfully.');
};

const getDocuments = async (req, res) => {
  const isPrivileged = ['super_admin', 'admin'].includes(req.user.permission);
  const filter = isPrivileged ? {} : { owner: req.user.id };
  const documents = await Document.find(filter)
    .populate('owner', 'fname lname username employee_id')
    .sort({ createdAt: -1 });
  return success(res, 200, documents, 'Documents retrieved successfully.');
};

const getDocument = async (req, res) => {
  const document = await Document.findById(req.params.id)
    .populate('owner', 'fname lname username employee_id');
  if (!document) {
    return failure(res, 404, 'Document not found.');
  }
  return success(res, 200, document, 'Document retrieved successfully.');
};

const updateDocument = async (req, res) => {
  const { error, value } = updateDocumentSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return failure(res, 400, 'Validation failed.', errors);
  }

  const document = await Document.findById(req.params.id);
  if (!document) {
    return failure(res, 404, 'Document not found.');
  }

  const { document_name, version, feedback, description, document_type } = value;

  if (document_name !== undefined) document.document_name = document_name;
  if (version !== undefined) document.version = version;
  if (feedback !== undefined) document.feedback = feedback || null;
  if (description !== undefined) document.description = description || null;
  if (document_type !== undefined) document.document_type = document_type || null;

  await document.save();

  return success(res, 200, document, 'Document updated successfully.');
};

const deleteDocument = async (req, res) => {
  const document = await Document.findByIdAndDelete(req.params.id);
  if (!document) {
    return failure(res, 404, 'Document not found.');
  }
  return success(res, 200, null, 'Document deleted successfully.');
};

module.exports = { createDocument, getDocuments, getDocument, updateDocument, deleteDocument };
