import { LOG_IN, LOG_OUT } from '../../../resources/strings/actions';
export interface Authenticate {
  user?: object;
}

// Action constants and shape
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

interface LoginAction {
  type: typeof LOG_IN;
  payload: Authenticate;
}

interface LogoutAction {
  type: typeof LOG_OUT;
  payload: null;
}

export type AuthenticateActionTypes = LoginAction | LogoutAction;
