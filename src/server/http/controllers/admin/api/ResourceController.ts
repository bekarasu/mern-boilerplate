import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Document } from 'mongoose';
import { IFieldItem } from '../../../../../../@types/server/admin/Form/IFieldItem';
import { IFormProperties } from '../../../../../../@types/server/admin/PageProperties/IFormProperties';
import { IGridProperties } from '../../../../../../@types/server/admin/PageProperties/IGridProperties';
import { IShowProperties } from '../../../../../../@types/server/admin/PageProperties/IShowProperties';
import { IBaseAdminService } from '../../../../../../@types/server/services/Admin/IBaseAdminService';
import HttpException from '../../../../exceptions/api/HTTPException';
import { toURLConverter } from '../../../../helpers/route';

abstract class ResourceController {
  protected abstract service: IBaseAdminService<Document>;

  protected abstract title: string;

  protected abstract serviceURL: string;

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limitParam: string = typeof req.query.limit != 'undefined' ? req.query.limit.toString() : '';
      const offsetParam: string = typeof req.query.start != 'undefined' ? req.query.start.toString() : '';
      const where: object = typeof req.query.search != 'undefined' ? this.whereStringToObject(req.query.search.toString()) : {};
      let fields: object = typeof req.query.fields != 'undefined' ? {} : {};
      if (Object.keys(fields).length === 0) {
        const fieldsFromClass = this.grid();
        fields = fieldsFromClass.fields;
      }
      const count = await this.service.count(where); // total data count, useful for pagination
      const limit: number | null = Number.parseInt(limitParam);
      const offset: number | null = Number.parseInt(offsetParam);
      const data = await this.service.list(where, fields, limit, offset);
      res.setMessage('Records Fetched').customResponse({ items: data, total: count });
    } catch (e) {
      next(e); // if you take an error, pass the function and go to middleware
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.show({ _id: req.params.id });
      if (item == null) {
        throw new HttpException(400, 'Record Not Found');
      }
      res.setMessage('Record Fetched').customResponse(item);
    } catch (e) {
      next(e); // if you take an error, pass the function and go to middleware
    }
  };

  insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        const validation = validationError.mapped();
        console.log(validation);

        const firstValidationMessage = validation[Object.keys(validation)[0]].msg;
        throw new HttpException(422, 'Validation Failed: ' + firstValidationMessage + ' in ' + validation[Object.keys(validation)[0]].param, {
          validation: validation,
        });
      }
      req.body.slug = req.body.slug ? toURLConverter(req.body.slug) : toURLConverter(req.body.name); // TODO check this with different model that slug doesnt exists.
      const document = req.body;
      if (typeof req.files != 'undefined') {
        document.images = this.processImages(req);
        if (document.images.length === 0) {
          delete document.images;
        }
      }
      await this.service.create(document);
      res.setMessage('Record Added').customResponse(document);
    } catch (e) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        throw new HttpException(422, 'Validation Failed', {
          validation: validationError.mapped(),
        });
      }
      const model: Document = req.body;
      // TODO make compatible
      // model.images = this.processImages(req);
      await this.service.update(req.params.id.toString(), model);
      res.setMessage('Record Updated').customResponse(model);
    } catch (e) {
      next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!this.service.delete(req.params.id.toString())) {
        throw new HttpException(400, "Record Couldn't Deleted");
      }
      res.setMessage('Record Deleted').customResponse();
    } catch (e) {
      next(e);
    }
  };

  all = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.setMessage('List Page Properties').customResponse({ ...this.grid(), title: this.title, resource: this.serviceURL });
    } catch (e) {
      next(e);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.setMessage('Create Page Properties').customResponse({ ...this.form(), title: this.title, resource: this.serviceURL });
    } catch (e) {
      next(e);
    }
  };

  detail = async (req: Request, res: Response, next: NextFunction) => {
    const fields = this.show();
    const selectFields: string[] = [];
    fields.items.forEach((item: IFieldItem) => {
      selectFields.push(item.name);
    });
    try {
      const model = await this.service.show({ _id: req.params.id }, selectFields);
      if (model === null) {
        throw new HttpException(400, 'Record Not Found');
      }
      fields.items.map((item: IFieldItem) => {
        if (item.type === 'object') {
          item.initialValue = JSON.stringify(model[item.name]);
        } else {
          item.initialValue = model[item.name];
        }
        return item;
      });
      res.setMessage('Show Page Properties').customResponse({ items: fields.items, title: this.title, resource: this.serviceURL });
    } catch (e) {
      next(e);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.show({ _id: req.params.id });
      if (data === null) {
        throw new HttpException(400, 'Record Not Found');
      }
      const form = this.form();
      for (const key in data) {
        for (const item in form.items) {
          if (form.items[item].name === key) {
            form.items[item].initialValue = data[key];
            break;
          }
        }
      }
      res.setMessage('Edit Page Properties').customResponse({ ...form, title: this.title, resource: this.serviceURL });
    } catch (e) {
      next(e);
    }
  };

  // TODO think about add afterUpdate, afterSave, beforeUpdate, beforeSave

  /**
   * convert the "where" param in url query to compatible for mongoose where query
   */
  private whereStringToObject(where: string): object {
    const whereObject = {};
    const whereFields = where.split(','); // split the query by ','
    if (whereFields.length > 1) {
      for (const key in whereFields) {
        const field = whereFields[key];
        // TODO add the > , < etc. operators
        const condition = field.split('=');
        whereObject[condition[0]] = condition[1];
      }
    } else {
      // TODO add the > , < etc. operators
      const condition = where.split('='); // left side would field, right side would value
      whereObject[condition[0]] = condition[1];
    }
    return whereObject;
  }

  abstract grid(): IGridProperties;

  abstract form(): IFormProperties;

  abstract show(): IShowProperties;

  /**
   * TODO make a structure that can impelemetable
   * @param method
   */
  abstract validate(method: string): Array<any>;
  /**
   * TODO make a structure that can impelemetable
   * @param request
   */
  abstract processImages(request: Request): Array<any>;
}

export default ResourceController;
