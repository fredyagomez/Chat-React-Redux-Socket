import { combineReducers } from 'redux';

import {
  SEND_MESSAGES
} from '../actions';

const AppState = (state = [], action) => {
  switch (action.type) {
    case SEND_MESSAGES:
      return [...state, action.message ];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  AppState
});

export default rootReducer;
