import { Aggregate, Document, FilterQuery, Model, Query, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { IRepository } from '../../../../@types/server/repositories/IRepository';
import { IKeyableObject } from '../../../../@types/shared/IKeyableObject';
import HttpException from '../../exceptions/api/HTTPException';
import DBException from '../../exceptions/DBException';

export default abstract class AbstractRepository<T extends Document> implements IRepository<T> {
  protected _model: Model<T>;
  constructor(model: Model<T>) {
    this._model = model;
  }

  findAll = async (
    where: object = {},
    select: object = {},
    options: QueryOptions | null = null,
    limit: number | null = null,
    offset: number | null = null,
  ): Promise<Query<T[], T>> => {
    const query = this._model.find(where, select, options);
    if (limit !== null && offset !== null && !isNaN(limit) && !isNaN(offset)) query.limit(limit).skip(offset);
    return await query.lean();
  };

  aggreate = async (params: IKeyableObject[]): Promise<Aggregate<any[]>> => {
    return this._model.aggregate(params);
  };

  find = async (where?: any, select?: any, options?: QueryOptions): Promise<Query<T | null, T>> => {
    const item = await this._model.findOne(where, select, options).exec();
    return item;
  };

  insert = async (newItem: object): Promise<T> => {
    const doc = new this._model(newItem);
    const savedDoc = await doc.save();
    if (doc != savedDoc) {
      throw new DBException("Document can't saved", [newItem]);
    }
    return savedDoc;
  };

  update = async (id: Types.ObjectId | string, updatedModel: UpdateQuery<T>): Promise<Query<any, any>> => {
    return this._model.findByIdAndUpdate(id, updatedModel, {
      useFindAndModify: false,
      new: true,
    });
  };

  delete = async (id: string): Promise<boolean> => {
    const document = await this._model.find({ _id: id, deletedAt: { $exists: true } } as FilterQuery<any>).catch((err) => {
      if (err) throw new HttpException(500, err.message);
    });
    if (typeof document[0] === 'undefined') {
      await this._model.deleteOne({ _id: id } as FilterQuery<any>).catch((err) => {
        if (err) throw new HttpException(500, err.message);
      });
    } else {
      const updatedField = {
        deletedAt: Date.now(),
      };
      await this._model.updateOne({ _id: id } as FilterQuery<any>, { $set: updatedField } as UpdateQuery<unknown>).catch((err) => {
        if (err) throw new HttpException(500, err.message);
      });
    }
    return true;
  };

  forceDelete = async (id: string): Promise<boolean> => {
    await this._model.findOneAndDelete({ _id: id } as FilterQuery<any>).catch((err) => {
      if (err) throw new HttpException(500, err.message);
    });
    return true;
  };

  count = async (where: object = {}): Promise<number> => {
    where['deletedAt'] = { $eq: null };
    return this._model.countDocuments(where, function (err) {
      if (err) throw new HttpException(500, err.message);
    });
  };

  isExists = async (filter: FilterQuery<T>): Promise<boolean> => {
    return this._model.exists(filter);
  };
}
