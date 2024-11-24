interface ErrorHandler extends Error {
  statusCode?: number;
}

export function createError(message: string, statusCode: number): ErrorHandler {
  const error = new Error(message) as ErrorHandler;
  error.statusCode = statusCode;
  return error;
}
