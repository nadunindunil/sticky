import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true
});

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
}
