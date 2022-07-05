import { IFilterFields, IFilterRedux, SET_FILTER } from '../../types/redux';

const initialState: IFilterFields = {
  fields: [],
};

export const filterReducer = (state = initialState, action: IFilterRedux): IFilterFields => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};
