const { UserInputError } = require('apollo-server-express');

const User = require('../../models/User');
const Employee = require('../../models/Employee');
const validateInput = require('../validation/validateInput');
const {
  signupValidationSchema,
  employeeByEidValidationSchema,
  addEmployeeValidationSchema,
  updateEmployeeValidationSchema,
} = require('../validation/schemas');
const { throwMongoFriendlyError } = require('../utils/errors');
const { toSafeDate } = require('../utils/date');
const { uploadEmployeePhoto, getUploadedFile } = require('../utils/employeePhoto');

const mutationResolvers = {
  signup: async (_parent, { input }) => {
    const validatedInput = await validateInput(signupValidationSchema, input);

    try {
      const user = new User({
        ...validatedInput,
        email: validatedInput.email.toLowerCase(),
      });

      return await user.save();
    } catch (error) {
      throwMongoFriendlyError(error);
    }
  },

  addEmployee: async (_parent, { input }, context) => {
    const validatedInput = await validateInput(addEmployeeValidationSchema, input);
    const uploadedFile = getUploadedFile(context);
    const photoUrl = await uploadEmployeePhoto({
      photoSource: validatedInput.employee_photo,
      uploadedFile,
    });

    try {
      const employee = new Employee({
        ...validatedInput,
        email: validatedInput.email.toLowerCase(),
        date_of_joining: toSafeDate(validatedInput.date_of_joining, 'date_of_joining'),
        employee_photo: photoUrl,
      });

      return await employee.save();
    } catch (error) {
      throwMongoFriendlyError(error);
    }
  },

  updateEmployeeByEid: async (_parent, { eid, input }, context) => {
    const validatedEid = await validateInput(employeeByEidValidationSchema, {
      eid,
    });
    const updateInput = input || {};
    const uploadedFile = getUploadedFile(context);

    if (Object.keys(updateInput).length === 0 && !uploadedFile) {
      throw new UserInputError('At least one field must be provided to update');
    }

    const validatedInput = await validateInput(
      updateEmployeeValidationSchema,
      updateInput
    );

    const employeePayload = { ...validatedInput };

    if (validatedInput.date_of_joining) {
      employeePayload.date_of_joining = toSafeDate(
        validatedInput.date_of_joining,
        'date_of_joining'
      );
    }

    if (validatedInput.email) {
      employeePayload.email = validatedInput.email.toLowerCase();
    }

    if (uploadedFile || validatedInput.employee_photo) {
      employeePayload.employee_photo = await uploadEmployeePhoto({
        photoSource: validatedInput.employee_photo,
        uploadedFile,
      });
    }

    try {
      const employee = await Employee.findOneAndUpdate(
        { eid: validatedEid.eid },
        employeePayload,
        {
          returnDocument: 'after',
          runValidators: true,
        }
      );

      if (!employee) {
        throw new UserInputError('Employee not found');
      }

      return employee;
    } catch (error) {
      throwMongoFriendlyError(error);
    }
  },

  deleteEmployeeByEid: async (_parent, { eid }) => {
    const validatedInput = await validateInput(employeeByEidValidationSchema, {
      eid,
    });

    const deleted = await Employee.findOneAndDelete({ eid: validatedInput.eid });
    return Boolean(deleted);
  },
};

module.exports = mutationResolvers;
