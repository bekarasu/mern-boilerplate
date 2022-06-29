import { CLEAR_RESULT, result, ResultTypes, SERVER_RESULT, SET_SHOWED_RESULT } from '../../../../../@types/client/admin/redux';

export function showServerResult(type: result, message: string): ResultTypes {
  return {
    type: SERVER_RESULT,
    payload: { message: message, type: type, redirected: true, showed: false },
  };
}

export function setShowedResult(type: result, message: string): ResultTypes {
  return {
    type: SET_SHOWED_RESULT,
    payload: { message: message, type: type, redirected: false, showed: true },
  };
}

export function clearResult(): ResultTypes {
  return {
    type: CLEAR_RESULT,
    payload: { message: null, type: null, redirected: false, showed: true },
  };
}
