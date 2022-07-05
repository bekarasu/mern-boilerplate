import { IFilterFields, IFilterRedux, SET_FILTER } from '../../types/redux';

export const setFilter = (fields: IFilterFields): IFilterRedux => ({
  type: SET_FILTER,
  payload: fields,
});
