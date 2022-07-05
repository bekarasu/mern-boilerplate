import { Document } from 'mongoose';

export interface IAdminUser extends Document {
  name: string;
  username: string;
  password: string;
  status: boolean;
  avatar?: string;
}
