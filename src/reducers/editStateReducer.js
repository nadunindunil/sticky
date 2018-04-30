import initialState from '../initialState';
import * as types from '../actions/editStateActions';

export default function editStateReducer(state = initialState.editState, action) {

  switch (action.type) {
    case types.CHANGE_STATE:
      let editState = action.editState;
      return editState;
    default:
      return state;
  }
}
