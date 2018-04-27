export const ADD_DATA = 'ADD_DATA';
export const CHANGE_CANVAS_DATA = 'CHANGE_CANVAS_DATA';

export function addCanvasData(note) {
  return { type: ADD_DATA, note: note };
}

export function changeCanvasData(data) {
  return { type: CHANGE_CANVAS_DATA, data: data };
}


