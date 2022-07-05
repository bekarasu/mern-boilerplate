import mongoose, { Schema } from 'mongoose';
import { IAdminUser } from '../types/models/AdminUser';

const AdminUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  avatar: String,
});

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema, 'adminUsers');
