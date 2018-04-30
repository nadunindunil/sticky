import * as types from '../actions/notesActions';
import initialState from '../initialState';

export default function notesReducer(state = initialState.notes, action) {
  // still use this is use for testing
  switch (action.type) {
    case types.GET_NOTES_SUCCESS:
      return action.notes;
    case types.EDIT_NOTE_SUCCESS:
      return action.notes;
    case types.INSERT_NOTE_SUCCESS:
      return action.notes;
    case types.DELETE_NOTE_SUCCESS:
      return action.notes;
    default:
      return state;
  }
}
