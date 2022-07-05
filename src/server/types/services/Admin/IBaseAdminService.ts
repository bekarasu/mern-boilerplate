import { Document } from 'mongoose';

export interface IBaseAdminService<T extends Document> {
  count(where?: object): Promise<number>;
  list(where?: object, fields?: object, limit?: number, offset?: number): Promise<T[] | null>;
  show(where?: object, fields?: object): Promise<T | null>;
  create(document: object): Promise<T>;
  update(id: string, document: object): Promise<T>;
  delete(id: string): Promise<boolean>;
  isExists(where: object): Promise<boolean>;
}
