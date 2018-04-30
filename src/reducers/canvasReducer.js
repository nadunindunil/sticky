import initialState from '../initialState';
import * as types from '../actions/canvasActions';

export default function canvasReducer(state = initialState.canvasData, action) {
  switch (action.type) {
    case types.ADD_DATA:
      return action.note;
    case types.CHANGE_CANVAS_DATA:
      return action.note;
    default:
      return state;
  }
}
