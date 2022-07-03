import mongoose, { Mongoose } from 'mongoose';
import { config } from '../config/config';

export const connectDb = async () => {
  const connectionString = config.db.srv || `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;

  let connection: Promise<Mongoose>;
  try {
    connection = mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log('DB Connection Error: ' + err.message);
    return null;
  }

  return connection;
};
