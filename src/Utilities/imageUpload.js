import React, { useRef, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import sprite from "../Styles/img/sprite.svg";
// import { storage } from "./firebase";
// import * as actions from "../Store/actions/modalAction";
import axios from "../axios";

const ImageUpload = (props) => {
  const [previewUrl, setPreviewUrl] = useState();
  // const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const {
    userId,
    token,
    // updateProfilePic,
    loggedInUser,
    // userDataId,
    image,
  } = props;
  const filePickerRef = useRef();
  // console.log(file)
  // console.log(progress)
  let pickedFile;
  const pickedHandler = (event) => {
    // let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  // const uploadHandler = useCallback(() => {
  // const uploadTask = storage.ref(`images/${file.name}`).put(file);
  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  // progress function ...
  // const progress = Math.round(
  //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  // );
  // setProgress(progress);
  // },
  //   (error) => {
  //     // Error function ...
  //     console.log(error);
  //   },
  //   () => {
  //     // complete function ...
  //     storage
  //       .ref("images")
  //       .child(file.name)
  //       .getDownloadURL()
  //       .then((url) => {
  //         const userPic = { userPic: url };
  //         updateProfilePic(userDataId, token, userPic);
  //         // console.log(loggedInUser,userId);
  //       });
  //   }
  // );
  // }, [token, updateProfilePic, userDataId, file]);
  const uploadHandler = useCallback(() => {
    const formData = new FormData();
    formData.append("image", file);
    // console.log(file, formData);
    axios
      .patch("users/images/" + userId, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [file, token, userId]);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    uploadHandler(token);
  }, [file, token, uploadHandler]);
  // console.log(process.env.REACT_APP_BACKEND_URL);
  // console.log(image.replace(/\\/gi, "/"));

  return (
    <div className="user-profile">
      <div className="user-image">
        {/* {image && <img src={image} alt="User Pic" />}
        {previewUrl && <img src={previewUrl} alt="Preview" />} */}
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" />
        ) : image ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
            alt="User Pic"
          />
        ) : null}
        {previewUrl || image ? null : (
          <svg className="icon-user">
            <use href={sprite + "#icon-user"}></use>
          </svg>
        )}
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        {loggedInUser === userId ? (
          <button className="img-button" onClick={pickImageHandler}>
            <div className="image">
              <svg className="icon-image">
                <use href={sprite + "#icon-image"}></use>
              </svg>
              <p className="caption">Upload Profile pic</p>
            </div>
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loggedInUser: state.auth.userId,
    // userDataId: state.stories.userData.userDataId,
    userId: state.stories.userData._id,
    image: state.stories.userData.imageUrl, //  "http://localhost:4000/uploadedImages/a4d83990-d10f-11ea-a9c5-455aeddb16f3.jpeg"
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateProfilePic: (userDataId, token, useProfile) =>
//       dispatch(actions.editProfile(userDataId, token, useProfile)),
//   };
// };

export default connect(mapStateToProps)(ImageUpload);
