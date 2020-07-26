import React, { useRef, useState, useEffect,useCallback } from "react";
import {connect} from 'react-redux';

import sprite from "../Styles/img/sprite.svg";
import {storage} from "./firebase";
import * as actions from '../Store/actions/modalAction';

const ImageUpload = (props) => {
  const [previewUrl, setPreviewUrl] = useState();
  // const [progress, setProgress] = useState(0);
  const [file, setFile] = useState()
  const{userId,token,updateProfilePic,loggedInUser,userDataId,image}=props;
  const filePickerRef = useRef();
  // console.log(file)
  // console.log(progress)
  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  
  const uploadHandler = useCallback(() => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on("state_changed", (snapshot) => {
      // progress function ...
      // const progress = Math.round(
      //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      // );
    // setProgress(progress);
    },
    error => {
      // Error function ...
      console.log(error);
    },
    () => {
      // complete function ...
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          const userPic={userPic:url}
          updateProfilePic(userDataId,token,userPic);
          // console.log(loggedInUser,userId);
        });
    }
    );
  },[token,updateProfilePic,userDataId,file]);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    uploadHandler();
  }, [file,uploadHandler]);

  return (
    <div className="user-profile">
      <div className="user-image">
        {image && <img src={image} alt="User Pic" />}
        {previewUrl && <img src={previewUrl} alt="Preview" />}
        {(previewUrl || image)?null: (
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
        {(loggedInUser===userId)?
        (<button className="img-button" onClick={pickImageHandler}>
          <div className="image">
            <svg className="icon-image">
              <use href={sprite + "#icon-image"}></use>
            </svg>
            <p className="caption">Upload Profile pic</p>
          </div>
        </button>):null}
      </div>
    </div>
  );
};

const mapStateToProps=(state)=>{
  return{
    token:state.auth.token,
    loggedInUser:state.auth.userId,
    userDataId:state.stories.userData.userDataId,
    userId:state.stories.userData.userId,
    image:state.stories.userData.userPic,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    updateProfilePic:(userDataId,token,useProfile)=>dispatch(actions.editProfile(userDataId,token,useProfile))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageUpload);
