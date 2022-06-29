import { IDb } from '../../../../@types/server/IDb';
abstract class AbstractDb implements IDb {
  abstract connect(): Promise<void>;
}

export default AbstractDb;
