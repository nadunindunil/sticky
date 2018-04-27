import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import canvasReducer from './canvasReducer';
import editStateReducer from "./editStateReducer";

const rootReducer = combineReducers({
  notes : notesReducer,
  canvasData : canvasReducer,
  editState : editStateReducer
});

export default rootReducer;
