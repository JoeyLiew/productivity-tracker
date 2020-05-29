import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import session from './session';
import error from './error';

const reducer = combineReducers({
  error,
  session,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
