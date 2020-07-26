import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const intialState = {
  loading: false,
  error: null,
  show: false,
};

const postStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};
const postSucced = (state, action) => {
  return updateObject(state, {
    loading: false,
    show: false,
  });
};
const postFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const modalClose = (state, action) => {
  return updateObject(state, { show: false });
};
const modalOpen = (state, action) => {
  return updateObject(state, { show: true });
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.POSTING_STORY_START:
      return postStart(state, action);
    case actionTypes.POSTING_STORY_SUCCESS:
      return postSucced(state, action);
    case actionTypes.POSTING_STORY_FAIL:
      return postFailed(state, action);
    case actionTypes.MODAL_CLOSE:
      return modalClose(state, action);
    case actionTypes.MODAL_OPEN:
      return modalOpen(state, action);
    default:
      return state;
  }
};

export default reducer;
