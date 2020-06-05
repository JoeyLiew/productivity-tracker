import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import session from './session';
import error from './error';
import tasks from './tasks';
import { LOGOUT_SUCCESS } from './session';

const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== LOGOUT_SUCCESS) return rootReducer(state, action);

  const newState = rootReducer(undefined, {});
  return newState;
};

const reducer = combineReducers({
  error,
  session,
  tasks,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk];

const store = createStore(
  resetEnhancer(reducer),
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
