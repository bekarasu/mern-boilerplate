import mongoose, { Schema, Document } from 'mongoose';

// useful for sql actions
export interface UserModel extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  created_at: Date;
  deleted_at?: Date;
}

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
export const User = mongoose.model<UserModel>('User', UserSchema);
