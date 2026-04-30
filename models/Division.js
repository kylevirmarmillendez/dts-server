const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema(
  {
    division_name: {
      type: String,
      required: true,
      trim: true,
    },
    division_code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    division_chief: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Division', divisionSchema);
