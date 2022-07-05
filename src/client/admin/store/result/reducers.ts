import { CLEAR_RESULT, Message, ResultTypes, SERVER_RESULT, SET_SHOWED_RESULT } from '../../types/redux';

const initialState: Message = {
  message: null,
  type: null,
  redirected: false,
  showed: false,
};

export const resultReducer = (state = initialState, action: ResultTypes): Message => {
  switch (action.type) {
    case SERVER_RESULT:
    case CLEAR_RESULT:
    case SET_SHOWED_RESULT:
      return action.payload;
    default:
      return state;
  }
};
