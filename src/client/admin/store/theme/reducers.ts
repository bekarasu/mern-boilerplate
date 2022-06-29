import { SET_THEME } from '../../../../../@types/client/admin/redux';

export function themeReducer(state = {}, action: any) {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
}
