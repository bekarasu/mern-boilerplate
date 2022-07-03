import mongoose, { Mongoose } from 'mongoose';
import { config } from '../config/config';

export const connectDb = async () => {
  let connectionString = config.db.srv;
  if (config.db.srv) {
    connectionString = config.db.srv;
  } else if (config.db.username && config.db.password) {
    connectionString = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;
  } else {
    connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;
  }

  let connection: Mongoose;
  try {
    connection = await mongoose.connect(connectionString, {
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
