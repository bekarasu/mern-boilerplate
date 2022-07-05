import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  created_at: Date;
  deleted_at?: Date;
}
