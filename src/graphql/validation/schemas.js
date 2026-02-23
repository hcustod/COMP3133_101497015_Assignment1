const { signupValidationSchema, loginValidationSchema } = require('./authSchemas');
const {
  employeeByEidValidationSchema,
  addEmployeeValidationSchema,
  updateEmployeeValidationSchema,
  designationDepartmentValidationSchema,
} = require('./employeeSchemas');

module.exports = {
  signupValidationSchema,
  loginValidationSchema,
  employeeByEidValidationSchema,
  addEmployeeValidationSchema,
  updateEmployeeValidationSchema,
  designationDepartmentValidationSchema,
};
