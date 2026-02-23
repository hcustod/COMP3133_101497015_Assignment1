const fs = require('fs/promises');
const { UserInputError } = require('apollo-server-express');

const cloudinary = require('../../config/cloudinary');

const uploadEmployeePhoto = async ({ photoSource, uploadedFile }) => {
  if (uploadedFile?.path) {
    try {
      const uploadResult = await cloudinary.uploader.upload(uploadedFile.path, {
        folder: 'comp3133/assignment1/employees',
      });

      return uploadResult.secure_url;
    } finally {
      await fs.unlink(uploadedFile.path).catch(() => {});
    }
  }

  if (!photoSource) {
    throw new UserInputError('employee_photo is required');
  }

  const uploadResult = await cloudinary.uploader.upload(photoSource, {
    folder: 'comp3133/assignment1/employees',
  });

  return uploadResult.secure_url;
};

const getUploadedFile = (context) => {
  if (context?.req?.file) {
    return context.req.file;
  }

  if (Array.isArray(context?.req?.files) && context.req.files.length > 0) {
    const namedFile = context.req.files.find(
      (file) => file.fieldname === 'employee_photo'
    );

    return namedFile || context.req.files[0];
  }

  return null;
};

module.exports = {
  uploadEmployeePhoto,
  getUploadedFile,
};
