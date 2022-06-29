import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from '../../http/middlewares/api/error.middleware';
import { notFoundHandler } from '../../http/middlewares/api/notFound.middleware';
import '../../libraries/ApiResponse';
import { restfulHandler } from '../../http/middlewares/api/restful.middleware';
export const appApiRouter = express.Router();
dotenv.config();

appApiRouter.use(restfulHandler);
appApiRouter.use(helmet());
appApiRouter.use(cors());
appApiRouter.use(bodyParser.json());

appApiRouter.use(errorHandler);
appApiRouter.use(notFoundHandler);
