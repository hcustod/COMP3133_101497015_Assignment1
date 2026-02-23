const { checkSchema, validationResult } = require('express-validator');
const { UserInputError } = require('apollo-server-express');

const validateInput = async (schema, payload = {}) => {
  const req = { body: { ...payload } };
  const chains = checkSchema(schema, ['body']);
  await Promise.all(chains.map((chain) => chain.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new UserInputError('Validation failed', {
      details: errors.array().map((error) => ({
        field: error.path || error.param,
        message: error.msg,
      })),
    });
  }

  return req.body;
};

module.exports = validateInput;
