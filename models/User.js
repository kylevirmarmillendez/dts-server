const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      enum: ['super_admin', 'admin', 'user', 'viewer'],
      default: 'user',
    },
    employee_id: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      default: null,
    },
    division: {
      type: String,
      enum: [
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
        null,
      ],
      default: null,
    },
    section: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
