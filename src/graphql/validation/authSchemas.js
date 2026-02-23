const signupValidationSchema = {
  username: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'username is required',
    },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'username must be between 3 and 50 characters',
    },
  },
  email: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'email is required',
    },
    isEmail: {
      errorMessage: 'email must be valid',
    },
    normalizeEmail: true,
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'password is required',
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'password must be at least 6 characters',
    },
  },
};

const loginValidationSchema = {
  username_or_email: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'username_or_email is required',
    },
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'password is required',
    },
  },
};

module.exports = {
  signupValidationSchema,
  loginValidationSchema,
};
