import { SET_THEME } from '../../types/redux';

export const themeReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
};
