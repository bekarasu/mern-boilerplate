import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/models/User';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  surname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  deleted_at: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model<IUser>('User', UserSchema);
