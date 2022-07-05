import { IUser } from './models/User';
import { IAdminUser } from './models/AdminUser';

declare namespace Express {
  export interface Request {
    user?: IUser;
    adminUser?: IAdminUser;
  }
}
