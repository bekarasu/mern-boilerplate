import { IFilterFields, IFilterRedux, SET_FILTER } from '../../../../../@types/client/admin/redux';

const initialState: IFilterFields = {
  fields: [],
};

export function filterReducer(state = initialState, action: IFilterRedux): IFilterFields {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}
