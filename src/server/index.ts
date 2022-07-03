import express from 'express';
import { fileSystem } from './config/filesystem';
import { connectDb } from './helpers/database';
import { adminApiRouter } from './routes/admin/api';
import { adminWebRouter } from './routes/admin/web';
import { appApiRouter } from './routes/app/api';
import { appWebRouter } from './routes/app/web';
import { config } from './config/config';
import { Mongoose } from 'mongoose';

if (!config.port) {
  throw new Error('Port Not Defined or Invalid');
}

const server = express();

server.use(fileSystem.assetUrl, express.static(fileSystem.uploadPath));
server.use(fileSystem.publicUrl, express.static(fileSystem.publicPath));
server.use('/api/admin', adminApiRouter);
server.use('/admin', adminWebRouter);
server.use('/api', appApiRouter);
server.use('/*', appWebRouter);

export let db: Mongoose | null;

const startServer = async () => {
  db = await connectDb();
  server.listen(config.port);
};

startServer();
