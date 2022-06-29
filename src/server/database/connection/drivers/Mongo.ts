import AbstractDb from '../AbstractDb';
import mongoose from 'mongoose';

class Mongo extends AbstractDb {
  connect = async (): Promise<void> => {
    let connectionString = '';
    if (process.env.MONGO_SRV == null || process.env.MONGO_SRV == '') {
      connectionString = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE;
    } else {
      connectionString = process.env.MONGO_SRV;
    }

    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log('DB Connection Error: ' + err.message);
    }
  };
}

export default Mongo;
