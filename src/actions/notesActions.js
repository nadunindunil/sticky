export const ACTION_SAMPLE = 'ACTION_SAMPLE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const INSERT_NOTE = 'INSERT_NOTE';

export function getNotes(notes) {
  return { type: ACTION_SAMPLE, notes: notes };
}

export function editNote(note) {
  return { type: EDIT_NOTE, note: note };
}

export function insertNote(note) {
  return { type: INSERT_NOTE, note: note };
}