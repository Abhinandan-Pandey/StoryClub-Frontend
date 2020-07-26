import React, { useState } from "react";
import { connect } from "react-redux";
import Textarea from 'react-textarea-autosize';


import * as actions from "../../Store/actions/index";
import Spinner from "../../Utilities/spinner";

function StoryModal(props) {
  const [story, setStory] = useState({
    title: props.card.title,
    body: props.card.body,
    privacy: props.card.privacy,
    type: props.type,
  });
  const [ValidationMessage, setValidationMessage] = useState(null);
  const inputChangeHandler = (e, identifier) => {
    setStory({
      ...story,
      [identifier]: e.target.value,
    });
  };

  const validation = () => {
    let valid = true;
    if (story["title"].trim() === "" || story["body"].trim() === "") {
      valid = false;
    }
    return valid;
  };
  const checkboxHandler = (e) => {
    setStory({
      ...story,
      privacy: e.target.checked,
    });
  };
  const postStoryHandler = () => {
    const postStory = {
      title: story["title"],
      body: story["body"],
      privacy: story["privacy"],
      userId: props.userId,
      userName: props.userName,
    };
    if (validation()) {
      setValidationMessage(null);
      if (props.type === "newPost") {
        props.postStory(postStory, props.token);
      } else if (props.type === "editPost") {
        props.editPost(postStory, props.card.userStoryId, props.token);
      }
    } else {
      setValidationMessage(
        <p className="error-modal">One or more fields are empty.</p>
      );
    }
  };
  const deletePostHandler = () => {
    props.deletePost(props.card.userStoryId, props.token);
  };
  let deletePostButton = 
    props.userId === props.card.userId ? (<><button
      className="delete-post" 
      onClick={deletePostHandler}
    >
      delete
    </button></>): (<><button
      className="delete-post" 
      onClick={deletePostHandler}
      style={{ visibility: "hidden" }}
    >
      delete
    </button></>)
  let checkBoxButton=props.userId === props.card.userId ? (
    <>
      <label>Keep private &nbsp;</label>
      <input
        type="checkbox"
        checked={story["privacy"]}
        onChange={(e) => checkboxHandler(e)}
      />
    </>
  ) : (
    <>
      <label style={{ visibility: "hidden" }}>
        Keep private &nbsp;
      </label>
      <input
        style={{ visibility: "hidden" }}
        type="checkbox"
        checked={story["privacy"]}
        onChange={(e) => checkboxHandler(e)}
      />
    </>
  ) 
  let postButton=props.userId === props.card.userId ? (
    <>
      <button
        className="submit-post"
        onClick={postStoryHandler}
      >
        post
      </button>
    </>
  ) : (
    <>
      <button
        className="submit-post"
        style={{ visibility: "hidden" }}
        onClick={postStoryHandler}
      >
        post
      </button>
    </>
  )
  
  if (props.type === "newPost") {
    deletePostButton = (
      <button className="delete-post"
      style={{ visibility: "hidden" }} 
      onClick={deletePostHandler}>
        delete
      </button>
    );
    checkBoxButton= <>
    <label>Keep private &nbsp;</label>
    <input
      type="checkbox"
      checked={story["privacy"]}
      onChange={(e) => checkboxHandler(e)}
    />
  </>
  postButton=<button
  className="submit-post"
  onClick={postStoryHandler}
>
  post
</button>
  }
  // console.log(props.card)
  return (
    <div className="box">
      {props.show ? (
        <div
          className="backdrop"
          onClick={props.closeModal}
          style={{
            opacity: props.show ? "1" : "0",
            transition: "opacity 1s linear",
          }}
        ></div>
      ) : null}
      {props.show ? (
        <div className="container">
          <div
            className="storyModal"
            style={{
              // transform: props.show ? "translateY(0)" : "translateY(-100vh)",
              opacity: props.show ? "1" : "0",
              transition: "opacity 1s linear",
            }}
          >
            {ValidationMessage}
            {!props.loading ? (
              <>
                <form>
                  <input
                    className="modal-title"
                    placeholder="Name of your Story"
                    value={story["title"]}
                    onChange={(e) => inputChangeHandler(e, "title")}
                  ></input>
                  <Textarea 
                    className="modal-body"
                    placeholder="text"
                    value={story["body"]}
                    minRows={5} 
                    maxRows={25}
                    onChange={(e) => inputChangeHandler(e, "body")}
                  ></Textarea>
                </form>
                <div className="modal-footer">
                  {checkBoxButton}
                  {deletePostButton}
                  {postButton}
                  <button
                    className="close-post"
                    onClick={() => props.closeModal()}
                  >
                    close
                  </button>
                </div>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.modal.loading,
    error: state.modal.error,
    show: state.modal.show,
    token: state.auth.token,
    userId: state.auth.userId,
    userName: state.auth.userName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postStory: (story, token) => dispatch(actions.postingStory(story, token)),
    deletePost: (storyId, token) =>
      dispatch(actions.deleteStory(storyId, token)),
    editPost: (story, storyId, token) =>
      dispatch(actions.patchStory(story, storyId, token)),
    closeModal: () => dispatch(actions.modalClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryModal);
