import Datastore from 'nedb';

export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const EDIT_NOTE_SUCCESS = 'EDIT_NOTE_SUCCESS';
export const INSERT_NOTE_SUCCESS = 'INSERT_NOTE_SUCCESS';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';

const db = new Datastore({ filename: 'datasource/datafile2', autoload: true });

function getNotesSuccess(notes) {
  return { type: GET_NOTES_SUCCESS, notes: notes };
}

// function editNoteSuccess(note) {
//   return { type: EDIT_NOTE_SUCCESS, note: note };
// }

// function insertNoteSuccess(note) {
//   return { type: INSERT_NOTE_SUCCESS, note: note };
// }

// function deleteNoteSuccess(note) {
//   return { type: INSERT_NOTE_SUCCESS, note: note };
// }

export function getNotes() {
  return dispatch => {
    db.find({}, (err, docs) => {
      dispatch(getNotesSuccess(docs));
    });
  };
}

export function insertNote(value) {
  return dispatch => {
    db.insert(
      {
        data: value
      },
      (err, newDocs) => {
        db.find({}, (err, docs) => {
          dispatch(getNotesSuccess(docs));
        });
      }
    );
  };
}

export function deleteNote(id) {
  return dispatch => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      db.find({}, (err, docs) => {
        dispatch(getNotesSuccess(docs));
      });
    });
  };
}

export function editNote(id, value) {
  return dispatch => {
    db.update({ _id: id }, { data: value }, {}, function(err, numReplaced) {
      db.find({}, (err, docs) => {
        dispatch(getNotesSuccess(docs));
      });
    });
  };
}
