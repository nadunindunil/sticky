import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
