import { LOG_IN, LOG_OUT } from '../../../resources/strings/actions';
import { Authenticate, AuthenticateActionTypes } from './types';
const initialState: Authenticate = {
  user: null,
};

export const authReducer = (state = initialState, action: AuthenticateActionTypes): Authenticate => {
  switch (action.type) {
    case LOG_IN:
      return {
        user: action.payload.user,
      };
    case LOG_OUT:
      return {
        user: null,
      };
    default:
      return state;
  }
};
