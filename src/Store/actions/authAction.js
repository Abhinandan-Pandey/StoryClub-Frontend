import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, userName) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    userName: userName,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = ({ email, password, isSignup, fullName }) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      displayName: fullName,
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const urlUserData = "https://storyclub-734f8.firebaseio.com/users.json";

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzOU2zSdEfJJ2fBMR3piZK9jH_q6g9nPQ";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzOU2zSdEfJJ2fBMR3piZK9jH_q6g9nPQ";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("userName", response.data.displayName);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        // console.log(response.data)
        if (isSignup) {
          const userData = {
            fullName: fullName,
            coverQuote: "cannot praise yourself ...",
            bio: "Works at XYZ Company",
            location: "Enter Your Location",
            userId: response.data.localId,
          };
          axios
            .post(urlUserData + "?auth=" + response.data.idToken, userData)
            .then((response) => {
              // console.log(response.data, "data saved Successfully", userData);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        if(!!err.response){
        dispatch(authFail(err.response.data.error.message));
        }else{
        dispatch(authFail(err.message));
        }
        // console.log(!!err.response,err.response.data.error)        
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");
        dispatch(authSuccess(token, userId, userName));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
