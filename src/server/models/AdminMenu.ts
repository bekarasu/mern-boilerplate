import * as mongoose from 'mongoose';
import { IAdminMenu } from '../types/models/AdminMenu';

const AdminMenuSchema: mongoose.Schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: Object,
    required: true,
  },
  url: {
    type: String,
  },
  parentID: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const AdminMenu = mongoose.model<IAdminMenu>('AdminMenu', AdminMenuSchema, 'adminMenu');
