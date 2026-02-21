const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Employee = require('../models/Employee');
const cloudinary = require('../config/cloudinary');

const uploadEmployeePhoto = async (photoSource) => {
  if (!photoSource) {
    throw new Error('employee_photo is required');
  }

  const uploadResult = await cloudinary.uploader.upload(photoSource, {
    folder: 'comp3133/assignment1/employees',
  });

  return uploadResult.secure_url;
};

const resolvers = {
  Query: {
    health: () => 'API is running',
    login: async (_parent, { username_or_email, password }) => {
      const normalizedInput = username_or_email.trim();
      const user = await User.findOne({
        $or: [
          { username: normalizedInput },
          { email: normalizedInput.toLowerCase() },
        ],
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: '1d' }
      );

      return { token, user };
    },
    getAllEmployees: async () => Employee.find().sort({ created_at: -1 }),
    searchEmployeeByEid: async (_parent, { eid }) => Employee.findOne({ eid }),
    searchEmployeeByDesignationOrDepartment: async (
      _parent,
      { designation, department }
    ) => {
      const orConditions = [];

      if (designation && designation.trim()) {
        orConditions.push({
          designation: { $regex: designation.trim(), $options: 'i' },
        });
      }
      if (department && department.trim()) {
        orConditions.push({
          department: { $regex: department.trim(), $options: 'i' },
        });
      }

      if (orConditions.length === 0) {
        throw new Error('Please provide designation or department');
      }

      return Employee.find({ $or: orConditions }).sort({ created_at: -1 });
    },
  },
  Mutation: {
    signup: async (_parent, { input }) => {
      const user = new User({ ...input, email: input.email.toLowerCase() });
      return user.save();
    },
    addEmployee: async (_parent, { input }) => {
      const photoUrl = await uploadEmployeePhoto(input.employee_photo);
      const employeePayload = {
        ...input,
        email: input.email.toLowerCase(),
        date_of_joining: new Date(input.date_of_joining),
        employee_photo: photoUrl,
      };

      const employee = new Employee(employeePayload);
      return employee.save();
    },
    updateEmployeeByEid: async (_parent, { eid, input }) => {
      const employeePayload = { ...input };
      if (input.date_of_joining) {
        employeePayload.date_of_joining = new Date(input.date_of_joining);
      }
      if (input.email) {
        employeePayload.email = input.email.toLowerCase();
      }
      if (input.employee_photo) {
        employeePayload.employee_photo = await uploadEmployeePhoto(
          input.employee_photo
        );
      }

      const employee = await Employee.findOneAndUpdate({ eid }, employeePayload, {
        new: true,
        runValidators: true,
      });

      if (!employee) {
        throw new Error('Employee not found');
      }

      return employee;
    },
    deleteEmployeeByEid: async (_parent, { eid }) => {
      const deleted = await Employee.findOneAndDelete({ eid });
      return Boolean(deleted);
    },
  },
};

module.exports = resolvers;
