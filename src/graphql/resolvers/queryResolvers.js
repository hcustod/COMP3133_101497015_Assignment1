const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server-express');

const User = require('../../models/User');
const Employee = require('../../models/Employee');
const validateInput = require('../validation/validateInput');
const {
  loginValidationSchema,
  employeeByEidValidationSchema,
  designationDepartmentValidationSchema,
} = require('../validation/schemas');

const queryResolvers = {
  health: () => 'API is running',

  login: async (_parent, { username_or_email, password }) => {
    const validatedInput = await validateInput(loginValidationSchema, {
      username_or_email,
      password,
    });

    const normalizedInput = validatedInput.username_or_email;
    const user = await User.findOne({
      $or: [{ username: normalizedInput }, { email: normalizedInput.toLowerCase() }],
    });

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(validatedInput.password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1d' }
    );

    return { token, user };
  },

  getAllEmployees: async () => Employee.find().sort({ created_at: -1 }),

  searchEmployeeByEid: async (_parent, { eid }) => {
    const validatedInput = await validateInput(employeeByEidValidationSchema, {
      eid,
    });

    return Employee.findOne({ eid: validatedInput.eid });
  },

  searchEmployeeByDesignationOrDepartment: async (
    _parent,
    { designation, department }
  ) => {
    const validatedInput = await validateInput(designationDepartmentValidationSchema, {
      designation,
      department,
    });

    const orConditions = [];

    if (validatedInput.designation) {
      orConditions.push({
        designation: { $regex: validatedInput.designation, $options: 'i' },
      });
    }

    if (validatedInput.department) {
      orConditions.push({
        department: { $regex: validatedInput.department, $options: 'i' },
      });
    }

    if (orConditions.length === 0) {
      throw new UserInputError('Please provide designation or department');
    }

    return Employee.find({ $or: orConditions }).sort({ created_at: -1 });
  },
};

module.exports = queryResolvers;
