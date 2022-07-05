import mongoose, { Schema } from 'mongoose';
import { IPlayground } from '../types/models/Playground';

const PlaygroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: String,
  status: Boolean,
  count: Number,
});

export const Playground = mongoose.model<IPlayground>('Playground', PlaygroundSchema);
