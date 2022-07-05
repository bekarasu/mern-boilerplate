import { Document } from 'mongoose';

export interface IPlayground extends Document {
  name: string;
  imageUrl: string;
  status: boolean;
  count: number;
}
