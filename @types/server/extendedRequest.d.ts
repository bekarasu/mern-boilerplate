import { IUser, IAdminUser } from '../shared/User';

declare namespace Express {
  export interface Request {
    user?: IUser;
    adminUser?: IAdminUser;
  }
}
