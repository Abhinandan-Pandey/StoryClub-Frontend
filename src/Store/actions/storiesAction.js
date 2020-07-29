import axios from "../../axios";
import * as actionTypes from "../actions/actionTypes";

export const fetchingStoryStart = () => {
  return {
    type: actionTypes.FETCHING_STORY_START,
  };
};

export const fetchingStorySuccess = (stories) => {
  // let storiesArray = Object.keys(stories).map((key) => {
  //   return { ...stories[key], userStoryId: key };
  // });
  // let storiesArray
  return {
    type: actionTypes.FETCHING_STORY_SUCCESS,
    stories: stories.stories,
  };
};

export const fetchingStoryFail = (err) => {
  return {
    type: actionTypes.FETCHING_STORY_FAIL,
    error: err,
  };
};

export const fetchingStory = (token) => {
  return (dispatch) => {
    dispatch(fetchingStoryStart());
    axios
      .get("/stories", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(fetchingStorySuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchingStoryFail(err));
      });
  };
};

export const fetchingUserStorySucced = (stories) => {
  // let userStoriesArray = Object.keys(stories).map((key) => {
  //   return { ...stories[key], userStoryId: key };
  // });
  let userStoriesArray = stories;
  return {
    type: actionTypes.FETCH_USER_STORY_SUCCESS,
    userStory: userStoriesArray,
  };
};
export const fetchingUserDataSucced = (userData) => {
  // let userDataArray = Object.keys(stories).map((key) => {
  //   return { ...stories[key], userDataId: key };
  // });
  return {
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    userData: userData,
  };
};
export const fetchingUserStoryStart = () => {
  return {
    type: actionTypes.FETCH_USER_STORY_START,
  };
};
export const fetchingUserStoryFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_STORY_FAIL,
    userStoryError: error,
  };
};
export const fetchingUserDataStart = () => {
  return {
    type: actionTypes.FETCH_USER_DATA_START,
  };
};
export const fetchingUserDataFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_DATA_FAIL,
    userDataError: error,
  };
};
export const fetchUserProfile = (userId, token) => {
  return (dispatch) => {
    dispatch(fetchingUserStoryStart());
    dispatch(fetchingUserDataStart());
    // const queryParams =
    //   "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("users/" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.stories);
        dispatch(fetchingUserStorySucced(response.data.stories));
        dispatch(fetchingUserDataSucced(response.data.user));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchingUserStoryFail(error));
      });
    // axios
    //   .get("/users.json" + queryParams)
    //   .then((response) => {
    //     dispatch(fetchingUserDataSucced(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     dispatch(fetchingUserDataFail(error));
    //   });
  };
};

export const deletedStory = (storyId) => {
  return {
    type: actionTypes.DELETED_STORY,
    storyId,
  };
};
export const updatedStory = (story) => {
  return {
    type: actionTypes.UPDATED_STORY,
    updatedStory: story,
  };
};
export const addedStory = (addedPost) => {
  return {
    type: actionTypes.ADDED_STORY,
    addedPost: addedPost,
  };
};
export const updatedProfile = (updatedProfile) => {
  return {
    type: actionTypes.UPDATED_PROFILE,
    updatedProfile,
  };
};
