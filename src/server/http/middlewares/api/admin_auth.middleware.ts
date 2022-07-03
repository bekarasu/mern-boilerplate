import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import HttpException from '../../../exceptions/api/HTTPException';
import { config } from '../../../config/config';

export const Auth = (req: Request, response: Response, next: NextFunction) => {
  if (!config.jwtKey) {
    throw new HttpException(500, 'JWT Secret Token Not Defined');
  }

  let token: string | null | undefined = req.headers.authorization;

  if (typeof token !== 'undefined' && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return response.status(401).setMessage('Unauthenticated').customResponse();
  }

  let tokenVerified: null | string | JwtPayload;
  try {
    tokenVerified = jwt.verify(token, config.jwtKey);
  } catch (err) {
    return response.status(401).setMessage('Token Is Invalid').customResponse();
  }

  if (!tokenVerified || tokenVerified == '') {
    return response.status(401).setMessage('Token Is Invalid').customResponse();
  }

  next();
};
