const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    eid: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 1000,
    },
    date_of_joining: {
      type: Date,
      required: true,
    },
    department: {
      required: true,
      type: String,
      trim: true,
    },
    employee_photo: {
      type: String,
      default: '',
    },
  },
  {
    collection: 'employees',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
