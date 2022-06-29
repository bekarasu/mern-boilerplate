import { LOG_IN, LOG_OUT } from '../../../resources/strings/actions';
import { Authenticate, AuthenticateActionTypes } from './types';

export function login(user: Authenticate): AuthenticateActionTypes {
  return {
    type: LOG_IN,
    payload: { user: user },
  };
}

export function logout(): AuthenticateActionTypes {
  // TODO expire the token on server side
  localStorage.removeItem('admin:accessToken');
  return {
    type: LOG_OUT,
    payload: null,
  };
}
