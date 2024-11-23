module.exports = function createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};