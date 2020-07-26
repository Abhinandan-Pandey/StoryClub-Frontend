import axios from "../../axios";
import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/index';

export const postingStart = () => {
  return {
    type: actionTypes.POSTING_STORY_START,
  };
};

export const postingSucceded = () => {
  return {
    type: actionTypes.POSTING_STORY_SUCCESS,
  };
};

export const postingFailed = (error) => {
  return {
    type: actionTypes.POSTING_STORY_FAIL,
    error: error,
  };
};
export const modalClose = () => {
  return {
    type: actionTypes.MODAL_CLOSE,
  };
};
export const modalOpen = () => {
  return {
    type: actionTypes.MODAL_OPEN,
  };
};

export const postingStory = (story, token) => {
  return (dispatch) => {
    dispatch(postingStart());
    axios
      .post("/stories.json?auth=" + token, story)
      .then((res) => {
          let addedPost={
              ...story,
              userStoryId:res.data.name,
          }; 
        //   console.log(addedStory)
        dispatch(postingSucceded());
        dispatch(actions.addedStory(addedPost))
        // console.log(res.data,'post')
      })
      .catch((err) => {
        console.log(err);
        dispatch(postingFailed(err));
      });
  };
};

export const patchStory = (story, storyId, token) => {
  return (dispatch) => {
    dispatch(postingStart());
    axios
      .patch("/stories/" + storyId + ".json?auth=" + token, story)
      .then((res) => {
        let updatedPost={
            ...story,
            userStoryId:storyId,
        }; 
          dispatch(postingSucceded())
          dispatch(actions.updatedStory(updatedPost))
        // console.log(updatedPost,"patch");
      })
      .catch((error) => {
          dispatch(postingFailed(error))
        // console.log(error);
      });
  };
};
export const deleteStory = (storyId, token) => {
  return (dispatch) => {
    dispatch(postingStart());
    axios
      .delete("/stories/" + storyId + ".json?auth=" + token)
      .then((res) => {
        dispatch(postingSucceded())
        dispatch(actions.deletedStory(storyId))
        // console.log(res.data, "deleted");
      })
      .catch((error) => {
        dispatch(postingFailed(error))       
        // console.log(error, "error");
      });
  };
};

export const editProfile = (userId, token, userProfile) => {
  return (dispatch) => {
    axios
      .patch("users/" + userId + ".json?auth=" + token, userProfile)
      .then((res) => {
        let updateProfile={
            ...userProfile,
            // userId:userId,
        }; 
          dispatch(actions.updatedProfile(updateProfile))
        // console.log(userId,updateProfile,res.data,'updatedProfile');
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
