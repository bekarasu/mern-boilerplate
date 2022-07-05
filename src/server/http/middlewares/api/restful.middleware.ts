import { NextFunction, Request, Response } from 'express';

export const restfulHandler = (req: Request, res: Response, next: NextFunction) => {
  res.set('Content-Type', 'application/json');
  next();
};
