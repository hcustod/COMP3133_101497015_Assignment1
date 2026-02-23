const { UserInputError } = require('apollo-server-express');

const throwMongoFriendlyError = (error) => {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'field';
    throw new UserInputError(`${field} already exists`);
  }

  throw error;
};

module.exports = {
  throwMongoFriendlyError,
};
