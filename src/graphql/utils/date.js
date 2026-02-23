const { UserInputError } = require('apollo-server-express');

const toSafeDate = (dateValue, fieldName) => {
  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new UserInputError(`${fieldName} must be a valid date`);
  }

  return parsedDate;
};

module.exports = {
  toSafeDate,
};
