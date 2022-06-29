import { IFilterRedux, SET_FILTER } from '../../../../../@types/client/admin/redux';
import { IFilterFields } from './../../../../../@types/client/admin/redux';

export function setFilter(fields: IFilterFields): IFilterRedux {
  return {
    type: SET_FILTER,
    payload: fields,
  };
}
