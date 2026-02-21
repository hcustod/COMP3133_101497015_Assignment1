const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    health: () => 'API is running',
    users: async () => User.find().sort({ created_at: -1 }),
    userByUsername: async (_parent, { username }) => User.findOne({ username }),
    employees: async () => Employee.find().sort({ created_at: -1 }),
    employeeById: async (_parent, { id }) => Employee.findById(id),
  },
  Mutation: {
    createUser: async (_parent, { input }) => {
      const user = new User(input);
      return user.save();
    },
    createEmployee: async (_parent, { input }) => {
      const employeePayload = {
        ...input,
        date_of_joining: new Date(input.date_of_joining),
      };

      const employee = new Employee(employeePayload);
      return employee.save();
    },
    updateEmployee: async (_parent, { id, input }) => {
      const employeePayload = { ...input };
      if (input.date_of_joining) {
        employeePayload.date_of_joining = new Date(input.date_of_joining);
      }

      const employee = await Employee.findByIdAndUpdate(id, employeePayload, {
        new: true,
        runValidators: true,
      });

      if (!employee) {
        throw new Error('Employee not found');
      }

      return employee;
    },
    deleteEmployee: async (_parent, { id }) => {
      const deleted = await Employee.findByIdAndDelete(id);
      return Boolean(deleted);
    },
  },
};

module.exports = resolvers;
