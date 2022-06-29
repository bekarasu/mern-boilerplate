import { IBaseAdminService } from '../../../../@types/server/services/Admin/IBaseAdminService';
import AbstractRepository from '../../database/repositories/AbstractRepository';
import { Document } from 'mongoose';

export default abstract class BaseService<T extends Document> implements IBaseAdminService<T> {
  protected abstract repository: AbstractRepository<T>;

  isExists = async (where: object): Promise<boolean> => this.repository.isExists(where);

  list = async (where?: object, fields?: object, limit?: number, offset?: number): Promise<T[]> =>
    this.repository.findAll(where, fields, null, limit, offset);

  show = async (where?: object, fields?: object): Promise<T | null> => this.repository.find(where, fields);

  count = async (where: object): Promise<number> => this.repository.count(where);

  create = async (document: object): Promise<T> => this.repository.insert(document);

  update = async (id: string, document: object): Promise<T> => this.repository.update(id, document);

  delete = async (id: string): Promise<boolean> => this.repository.delete(id);
}
