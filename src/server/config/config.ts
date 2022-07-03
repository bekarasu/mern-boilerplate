import * as dotenv from 'dotenv';
import { IConfig } from '../../../@types/server/IConfig';

dotenv.config();

export const config: IConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  env: process.env.NODE_ENV || 'local',
  db: {
    srv: process.env.MONGO_SRV,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
  jwtKey: process.env.JWT_SECRET,
  jwtExpireTime: process.env.JWT_EXPIRE_TIME || '36000s',
};
