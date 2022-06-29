import { Aggregate, Document, FilterQuery, Query, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { IKeyableObject } from '../../shared/IKeyableObject';

export interface IRepository<T extends Document> {
  findAll: (where: object, select: object, options: QueryOptions | null, limit: number | null, offset: number | null) => Promise<Query<T[], T>>;
  find: (where?: any, select?: any, options?: QueryOptions) => Promise<Query<T | null, T>>;
  aggreate: (params: IKeyableObject[]) => Promise<Aggregate<any[]>>;
  insert: (newItem: object) => Promise<T>;
  update: (id: Types.ObjectId | string, updatedModel: UpdateQuery<T>) => Promise<Query<any, any>>;
  delete: (id: string) => Promise<boolean>;
  forceDelete: (id: string) => Promise<boolean>;
  count: (where: object) => Promise<number>;
  isExists: (filter: FilterQuery<T>) => Promise<boolean>;
}
