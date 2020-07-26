import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const intialState = {
  loading: true,
  error: null,
  stories: [],
  userData: null,
  loadingUserData: true,
  loadingUserStory: true,
  errorUserData: null,
  errorUserStory: null,
  // updatedStory: null,
  // deletedStoryId: null,
  // updatedProfile: null,
  // addedStory: null,
};

const fetchingStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const fetchingSuccess = (state, action) => {
  return updateObject(state, {
    stories: action.stories,
    loading: false,
  });
};
const fetchingFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const fetchUserDataSuccess = (state, action) => {
  return updateObject(state, {
    loadingUserData: false,
    userData: action.userData,
  });
};
const fetchUserStorySuccess = (state, action) => {
  return updateObject(state, {
    loadingUserStory: false,
    stories: action.userStory,
  });
};
const fetchUserDataFail = (state, action) => {
  return updateObject(state, {
    // loadingUserData: false,
    errorUserData: action.userDataError,
  });
};
const fetchUserStoryFail = (state, action) => {
  return updateObject(state, {
    loadingUserStory: false,
    errorUserStory: action.userStoryError,
  });
};
const fetchUserDataStart = (state, action) => {
  return updateObject(state, {
    loadingUserData: true,
  });
};
const fetchUserStoryStart = (state, action) => {
  return updateObject(state, {
    loadingUserStory: true,
  });
};
const updatedStory = (state, action) => {
  // return updateObject(state, { updatedStory: action.updatedStory });
  const stories=state.stories.map((story)=>{
    if(action.updatedStory.userStoryId===story.userStoryId){
      return action.updatedStory
    }else{
      return story;
    }
  })
  return updateObject(state,{stories})
};
const addedStory = (state, action) => {
  // return updateObject(state, { addedStory: action.addedPost });
  const stories=state.stories.concat(action.addedPost)
  return updateObject(state,{stories})
};
const deletedStory = (state, action) => {
  // return updateObject(state, { deletedStoryId: action.storyId });
  const stories= state.stories.filter((story)=> story.userStoryId!==action.storyId)
  return updateObject(state,{stories})
};
const updatedProfile = (state, action) => {
  // return updateObject(state, { updatedProfile: action.updatedProfile });
  const userData={
    ...state.userData,
    ...action.updatedProfile,
  }
  return updateObject(state,{userData})
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_STORY_START:
      return fetchingStart(state, action);
    case actionTypes.FETCHING_STORY_SUCCESS:
      return fetchingSuccess(state, action);
    case actionTypes.FETCHING_STORY_FAIL:
      return fetchingFailed(state, action);
    case actionTypes.FETCH_USER_DATA_SUCCESS:
      return fetchUserDataSuccess(state, action);
    case actionTypes.FETCH_USER_STORY_SUCCESS:
      return fetchUserStorySuccess(state, action);
    case actionTypes.FETCH_USER_DATA_START:
      return fetchUserDataStart(state, action);
    case actionTypes.FETCH_USER_STORY_START:
      return fetchUserStoryStart(state, action);
    case actionTypes.FETCH_USER_DATA_FAIL:
      return fetchUserDataFail(state, action);
    case actionTypes.FETCH_USER_STORY_FAIL:
      return fetchUserStoryFail(state, action);
    case actionTypes.UPDATED_PROFILE:
      return updatedProfile(state, action);
    case actionTypes.UPDATED_STORY:
      return updatedStory(state, action);
    case actionTypes.DELETED_STORY:
      return deletedStory(state, action);
    case actionTypes.ADDED_STORY:
      return addedStory(state, action);
    default:
      return state;
  }
};

export default reducer;
