import * as types from '../actions/notesActions';
import initialState from '../initialState';

export default function notesReducer(state = initialState.notes, action) {
  // still use this is use for testing
  switch (action.type) {
    case types.ACTION_SAMPLE:
      return action.notes;
    case types.EDIT_NOTE:
      let notes = findAndReplace(state, action.note.id, action.note.data);
      return notes;
    case types.INSERT_NOTE:
      console.log(action, state);
      let newNotes = state;
      newNotes.push({ id: action.note.id, data: action.note.data });
      console.log(newNotes);
      return newNotes;
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
