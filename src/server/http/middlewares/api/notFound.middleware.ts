import { Request, Response } from 'express';

export const notFoundHandler = (request: Request, response: Response) => {
  const message = 'Service not found';

  response.status(404).setMessage(message).customResponse();
};
