import axios from "../../axios";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";

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
  // console.log(story, token);
  return (dispatch) => {
    dispatch(postingStart());
    axios
      .post("/stories", story, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data, story, "check");

        let addedPost = {
          ...res.data.story,
          // _id: res.data.story._id,
        };
        //   console.log(addedStory)
        dispatch(postingSucceded());
        dispatch(actions.addedStory(addedPost));
        // console.log(res.data,'post')
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(postingFailed(err));
      });
  };
};

export const patchStory = (story, storyId, token) => {
  return (dispatch) => {
    dispatch(postingStart());
    axios
      .patch("/stories/" + storyId, story, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let updatedPost = {
          ...res.data.editedStory,
          // _id: res.data.editedStory._id,
        };
        dispatch(postingSucceded());
        dispatch(actions.updatedStory(updatedPost));
        // console.log(updatedPost,"patch");
      })
      .catch((error) => {
        dispatch(postingFailed(error));
        // console.log(error);
      });
  };
};
export const deleteStory = (storyId, token) => {
  return (dispatch) => {
    dispatch(postingStart());
    axios
      .delete("/stories/" + storyId, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(postingSucceded());
        dispatch(actions.deletedStory(storyId));
        // console.log(res.data, "deleted");
      })
      .catch((error) => {
        dispatch(postingFailed(error));
        // console.log(error, "error");
      });
  };
};

export const editProfile = (userId, token, userProfile) => {
  return (dispatch) => {
    axios
      .patch("users/" + userId, userProfile, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let updateProfile = {
          ...userProfile,
          // userId:userId,
        };
        dispatch(actions.updatedProfile(updateProfile));
        // console.log(userId,updateProfile,res.data,'updatedProfile');
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
