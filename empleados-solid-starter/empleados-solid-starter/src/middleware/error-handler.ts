import { ErrorRequestHandler } from 'express';
import { HttpError } from '../errors/http-errors.js';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  if (typeof error?.status === 'number') {
    next(error);
    return;
  }

  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor' });
};
``