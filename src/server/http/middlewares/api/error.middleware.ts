import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { promisify } from 'util';
import HttpException from '../../../exceptions/api/HTTPException';
import { config } from '../../../config/config';

const unlinkAsync = promisify(fs.unlink);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction): Express.Response => {
  const status = error.statusCode || 500;
  let message = '';
  let data = {};
  if (typeof request.files != 'undefined' && request.files.length > 0) {
    const files = Object.values(request.files);
    files.forEach((file: Express.Multer.File): Promise<void> => unlinkAsync(file.path));
  }

  if (config.env === 'production') {
    message = 'We are having some problems. This error logged.';
    data = { error: error.error };
  } else {
    message = error.message !== '' ? error.message : 'We are having some problems. This error logged.';
    data = { error: error.error };
  }

  console.log({
    message: error.message,
    log: { error },
    statusCode: status,
    endpoint: request.originalUrl,
    type: 'rest',
    status: status === 422 ? 'warning' : 'error',
    createdAt: new Date(),
  });

  return response.status(status).setMessage(message).customResponse(data);
};
