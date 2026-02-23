const employeeByEidValidationSchema = {
  eid: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'eid is required',
    },
  },
};

const addEmployeeValidationSchema = {
  eid: {
    in: ['body'],
    trim: true,
    notEmpty: { errorMessage: 'eid is required' },
  },
  first_name: {
    in: ['body'],
    trim: true,
    notEmpty: { errorMessage: 'first_name is required' },
  },
  last_name: {
    in: ['body'],
    trim: true,
    notEmpty: { errorMessage: 'last_name is required' },
  },
  email: {
    in: ['body'],
    trim: true,
    notEmpty: { errorMessage: 'email is required' },
    isEmail: { errorMessage: 'email must be valid' },
    normalizeEmail: true,
  },
  gender: {
    in: ['body'],
    trim: true,
    notEmpty: { errorMessage: 'gender is required' },
    isIn: {
      options: [['Male', 'Female', 'Other']],
      errorMessage: 'gender must be Male, Female, or Other',
    },
  },
  designation: {
    in: ['body'],
    trim: true,
    notEmpty: { errorMessage: 'designation is required' },
  },
  salary: {
    in: ['body'],
    notEmpty: { errorMessage: 'salary is required' },
    isFloat: {
      options: { min: 1000 },
      errorMessage: 'salary must be a number greater than or equal to 1000',
    },
    toFloat: true,
  },
  date_of_joining: {
    in: ['body'],
    notEmpty: { errorMessage: 'date_of_joining is required' },
    isISO8601: {
      errorMessage: 'date_of_joining must be a valid ISO date string',
    },
  },
  department: {
    in: ['body'],
    trim: true,
    notEmpty: { errorMessage: 'department is required' },
  },
  employee_photo: {
    in: ['body'],
    optional: true,
    trim: true,
    isString: { errorMessage: 'employee_photo must be a string when provided' },
  },
};

const updateEmployeeValidationSchema = {
  first_name: {
    in: ['body'],
    optional: true,
    trim: true,
    notEmpty: { errorMessage: 'first_name cannot be empty' },
  },
  last_name: {
    in: ['body'],
    optional: true,
    trim: true,
    notEmpty: { errorMessage: 'last_name cannot be empty' },
  },
  email: {
    in: ['body'],
    optional: true,
    trim: true,
    isEmail: { errorMessage: 'email must be valid' },
    normalizeEmail: true,
  },
  gender: {
    in: ['body'],
    optional: true,
    trim: true,
    isIn: {
      options: [['Male', 'Female', 'Other']],
      errorMessage: 'gender must be Male, Female, or Other',
    },
  },
  designation: {
    in: ['body'],
    optional: true,
    trim: true,
    notEmpty: { errorMessage: 'designation cannot be empty' },
  },
  salary: {
    in: ['body'],
    optional: true,
    isFloat: {
      options: { min: 1000 },
      errorMessage: 'salary must be a number greater than or equal to 1000',
    },
    toFloat: true,
  },
  date_of_joining: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'date_of_joining must be a valid ISO date string',
    },
  },
  department: {
    in: ['body'],
    optional: true,
    trim: true,
    notEmpty: { errorMessage: 'department cannot be empty' },
  },
  employee_photo: {
    in: ['body'],
    optional: true,
    trim: true,
    isString: { errorMessage: 'employee_photo must be a string when provided' },
  },
};

const designationDepartmentValidationSchema = {
  designation: {
    in: ['body'],
    optional: true,
    trim: true,
    notEmpty: { errorMessage: 'designation cannot be empty' },
  },
  department: {
    in: ['body'],
    optional: true,
    trim: true,
    notEmpty: { errorMessage: 'department cannot be empty' },
  },
};

module.exports = {
  employeeByEidValidationSchema,
  addEmployeeValidationSchema,
  updateEmployeeValidationSchema,
  designationDepartmentValidationSchema,
};
