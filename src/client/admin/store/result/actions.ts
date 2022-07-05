import { CLEAR_RESULT, result, ResultTypes, SERVER_RESULT, SET_SHOWED_RESULT } from '../../types/redux';

export const showServerResultMessage = (type: result, message: string): ResultTypes => ({
  type: SERVER_RESULT,
  payload: { message, type, redirected: true, showed: false },
});

export const setShowedResultMessage = (type: result, message: string): ResultTypes => ({
  type: SET_SHOWED_RESULT,
  payload: { message, type, redirected: false, showed: true },
});

export const clearResultMessage = (): ResultTypes => ({
  type: CLEAR_RESULT,
  payload: { message: null, type: null, redirected: false, showed: true },
});
