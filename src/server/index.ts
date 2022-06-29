import * as dotenv from 'dotenv';
import express from 'express';
import { fileSystem } from './config/filesystem';
import { loadDb } from './helpers/database';
import { adminApiRouter } from './routes/admin/api';
import { adminWebRouter } from './routes/admin/web';
import { appApiRouter } from './routes/app/api';
import { appWebRouter } from './routes/app/web';
dotenv.config();

if (process.env.PORT == null || isNaN(parseInt(process.env.PORT))) {
  throw new Error('Port Not Defined or Invalid');
}

const server = express();

server.use(fileSystem.assetUrl, express.static(fileSystem.uploadPath));
server.use(fileSystem.publicUrl, express.static(fileSystem.publicPath));
server.use('/api/admin', adminApiRouter);
server.use('/admin', adminWebRouter);
server.use('/api', appApiRouter);
server.use('/*', appWebRouter);

if (process.env.DB_CONNECTION != null) {
  const db = loadDb(process.env.DB_CONNECTION);
  if (db == null) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('Invalid Driver');
    }
  } else {
    db.connect();
  }
}

if (process.env.PROTOCOL === 'https') {
  throw new Error('not supported');
} else {
  const PORT: number = parseInt(process.env.PORT as string, 10);
  server.listen(PORT);
}
