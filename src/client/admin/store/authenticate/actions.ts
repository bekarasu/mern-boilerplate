import { LOG_IN, LOG_OUT } from '../../../resources/strings/actions';
import { Authenticate, AuthenticateActionTypes } from './types';

export const login = (user: Authenticate): AuthenticateActionTypes => ({
  type: LOG_IN,
  payload: { user: user },
});

export const logout = (): AuthenticateActionTypes => {
  // TODO expire the token on server side
  localStorage.removeItem('admin:accessToken');
  return {
    type: LOG_OUT,
    payload: null,
  };
};
