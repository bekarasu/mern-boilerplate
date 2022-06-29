import AbstractDb from '../database/connection/AbstractDb';
import Mongo from '../database/connection/drivers/Mongo';

export const loadDb = (driver: string): AbstractDb | null => {
  switch (driver) {
    case 'mongo':
    case 'mongodb':
      return new Mongo();
    default:
      return null;
  }
};
