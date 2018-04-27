export const CHANGE_STATE = 'CHANGE_STATE';

export function changeState(editState) {
  return { type: CHANGE_STATE, editState: editState };
}
