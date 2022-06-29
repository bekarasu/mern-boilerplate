import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({});

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    INITIAL_STATE: {} | undefined;
  }
}

const state = typeof window != 'undefined' ? window.INITIAL_STATE : {};

export const store = createStore(rootReducer, state, applyMiddleware(thunk));
