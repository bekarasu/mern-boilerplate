import { store } from '../../../client/app/store';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { matchRoutes } from 'react-router-config';
import Routes from '../../../shared/resources/routes';
import renderer from '../../helpers/renderer';
export const appWebRouter = express.Router();

appWebRouter.use(helmet({ contentSecurityPolicy: false }));
appWebRouter.use(cors());

appWebRouter.get('*', async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.includes('.')) {
    return next();
  }

  const promises = matchRoutes(Routes, req.originalUrl).map(async ({ route, match }) => {
    return route.loadData && store ? route.loadData(store, match.params) : null;
  });

  await Promise.all(promises);

  res.send(renderer(req.originalUrl, store));
});
