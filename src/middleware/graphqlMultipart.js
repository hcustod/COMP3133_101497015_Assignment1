const setValueAtPath = (target, path, value) => {
  const keys = path.split('.');
  let current = target;

  for (let index = 0; index < keys.length - 1; index += 1) {
    const key = keys[index];

    if (current[key] === undefined || current[key] === null) {
      const nextKey = keys[index + 1];
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }

    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
};

const parseGraphQLMultipart = (req, _res, next) => {
  if (!req.is('multipart/form-data')) {
    return next();
  }

  try {
    if (!req.body?.operations) {
      return next();
    }

    const operations = JSON.parse(req.body.operations);
    const map = req.body.map ? JSON.parse(req.body.map) : {};

    const filesByField = {};
    if (Array.isArray(req.files)) {
      req.files.forEach((file) => {
        filesByField[file.fieldname] = file;
      });
    }

    Object.entries(map).forEach(([fieldName, paths]) => {
      const file = filesByField[fieldName];
      if (!file) {
        return;
      }

      paths.forEach((path) => {
        setValueAtPath(operations, path, file.path);
      });
    });

    req.body = operations;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = parseGraphQLMultipart;
