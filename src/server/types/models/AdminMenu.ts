import { Document, Types } from 'mongoose';
import { TranslateParams } from '../../../shared/types/Lang';

export interface IAdminMenu extends Document {
  _id: Types.ObjectId;
  id: string;
  name: string;
  label: IAdminMenuLabel | string;
  url?: string;
  parentID: number;
  children?: Array<IAdminMenu>;
}

export interface IAdminMenuLabel {
  key: string;
  params: TranslateParams;
}
