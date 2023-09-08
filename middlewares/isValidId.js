const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/httpError");

const isValidId = (res, req, next) => {
  const { contactId } = res.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
