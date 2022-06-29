import { Document, Types } from 'mongoose';
import { IAdminMenu } from '../../shared/AdminMenu';

export interface AdminMenuDocument extends IAdminMenu, Document {
  _id: Types.ObjectId;
}
