import * as dotenv from 'dotenv';
import { IConfig } from '../types/IConfig';

dotenv.config();

export const config: IConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  env: process.env.NODE_ENV || 'local',
  db: {
    srv: process.env.MONGO_SRV,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
  jwtKey: process.env.JWT_SECRET,
  jwtExpireTime: process.env.JWT_EXPIRE_TIME || '36000s',
};
