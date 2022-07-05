import { generateResourceRouteGroup } from './../../helpers/routeServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import { fileSystem } from '../../config/filesystem';
import HttpException from '../../exceptions/api/HTTPException';
import AdminMenuController from '../../http/controllers/admin/api/AdminMenuController';
import AuthController from '../../http/controllers/admin/api/AuthController';
import FileController from '../../http/controllers/admin/api/FileController';
import PlaygroundController from '../../http/controllers/admin/api/PlaygroundController';
import { Auth } from '../../http/middlewares/api/admin_auth.middleware';
import { errorHandler } from '../../http/middlewares/api/error.middleware';
import { notFoundHandler } from '../../http/middlewares/api/notFound.middleware';
import { restfulHandler } from '../../http/middlewares/api/restful.middleware';
import '../../libraries/ApiResponse';

export const adminApiRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(fileSystem.imagesPath, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      cb(
        new HttpException(400, 'invalid image type', {
          file: file.originalname,
        }),
      );
    } else {
      cb(null, true);
    }
  },
});

adminApiRouter.use(restfulHandler);
adminApiRouter.use(helmet());
adminApiRouter.use(cors());
adminApiRouter.use(bodyParser.json());

adminApiRouter.post('/login', AuthController.login.bind(AuthController));
adminApiRouter.get('/auth-token', AuthController.getUserByToken);

adminApiRouter.use(Auth);

adminApiRouter.route('/uploadFile').post(upload.any(), FileController.uploadFile);

adminApiRouter.route('/admin-menu').get(AdminMenuController.getList);

generateResourceRouteGroup(adminApiRouter, 'playground', PlaygroundController, upload);

adminApiRouter.use(errorHandler);
adminApiRouter.use(notFoundHandler);
