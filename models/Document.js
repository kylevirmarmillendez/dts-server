const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    document_name: {
      type: String,
      required: true,
      trim: true,
    },
    version: {
      type: String,
      trim: true,
      default: null,
    },
    feedback: {
      type: String,
      trim: true,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    document_type: {
      type: String,
      enum: ['Service Order', 'Memorandum', 'DTR', 'Accomplishment Report', 'Other'],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
