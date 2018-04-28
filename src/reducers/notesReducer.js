import * as types from '../actions/notesActions';
import initialState from '../initialState';

export default function notesReducer(state = initialState.notes, action) {
  // still use this is use for testing
  switch (action.type) {
    case types.GET_NOTES_SUCCESS:
      console.log(action);
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

const findAndReplace = (array, value, replacevalue) => {
  console.log(array, value, replacevalue);
  for (var x in array) {
    if (x.id == value) {
      x.data = replacevalue;
    }
  }
  console.log(array);
  return array;
};
