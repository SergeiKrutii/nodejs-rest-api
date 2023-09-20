const errors = {
  400: "Bad request",
  401: "Unathorized",
  402: "Payment required",
  403: "Forbidden",
  404: "Not found",
  409: "Email in use",
};
const HttpError = (status, message = errors[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
