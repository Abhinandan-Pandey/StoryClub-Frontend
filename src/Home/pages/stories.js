import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import StoryCard from "../components/storyCard";
import * as actions from "../../Store/actions/index";
import Spinner from "../../Utilities/spinner";
import StoryModal from "../../Home/components/storyModel";
import axios from "../../axios";
import withErrorHandler from "../../Hoc/withErrorHandler";

function Stories(props) {
  const [storyModal, setStoryModal] = useState(null);
  const { fetchStories, token } = props;
  const viewProfileHandler = () => {
    const uid = props.userId;
    props.history.push("/profile/" + uid);
  };
  const ProfileHandler = (uid) => {
    props.history.push("/profile/" + uid);
  };
  const postEditorHandler = (type, data) => {
    setStoryModal(<StoryModal type={type} card={data} />);
    props.storyModalOpen();
  };

  useEffect(() => {
    fetchStories(token);
  }, [fetchStories, token]);

  const [stories, setStories] = useState([]);
  const { storiesArray } = props;
  useEffect(() => {
    setStories(storiesArray); 
  }, [storiesArray]);
  const divideStories = (publicStories) => {
    var total = publicStories.length;
    var each = total / 3;
    var left = total - 3*Math.floor(total/ 3);
    var f, s ;
    var  fe, ss, se;
    f = s = each;
    if (left === 1) {
      f += 1;
    } else if (left === 2) {
      f +=1;
      s += 1;
    }
    // fs=0;
    fe=f-1;
    ss=fe+1;
    se=fe+s;
    // ts=se+1;
    // te=total-1;
    return { fe,ss, se };
  };
  let storyCards=null
  let storyCol1=[]
  let storyCol2=[]
  let storyCol3=[]
  if (stories.length!==0) { 
    const publicStories = stories.filter((card) => card.privacy === false);
      publicStories.forEach((card, i) => {
      const {fe,ss, se}=divideStories(publicStories);
      if(i<=fe){
        storyCol1.push(<StoryCard
          key={card.title + i}
          postEditor={() => postEditorHandler("editPost", card)}
          profileViewer={() => ProfileHandler(card.userId)}
          card={card}
          userId={props.userId}
        />)
      }else if(i<=se && i>=ss){
        storyCol2.push(<StoryCard
          key={card.title + i}
          postEditor={() => postEditorHandler("editPost", card)}
          profileViewer={() => ProfileHandler(card.userId)}
          card={card}
          userId={props.userId}
        />)
      }else{
        storyCol3.push(<StoryCard
          key={card.title + i}
          postEditor={() => postEditorHandler("editPost", card)}
          profileViewer={() => ProfileHandler(card.userId)}
          card={card}
          userId={props.userId}
        />)
      }
    });
  }
  if (stories.length === 0) {
    storyCards = <h1>No Post Found</h1>;
  } 
  return (
    <>
      {!props.loading ? (
        <>
          {props.storyModalReset ? storyModal : null}
          <div className="introHeader">
            <h1 className="heading-1 intro">Everone Has Story to Tell</h1>
            <h3 className="line">Show your story to world</h3>
            <button
              className="btn-primary pro-btn"
              onClick={viewProfileHandler}
            >
              Veiw Profile
            </button>
          </div>
          <div className="container-header">Public Stories</div>
          <div className='grid-container'>
            {storyCards}
          <div className="stories">{storyCol1}</div>
          <div className="stories">{storyCol2}</div>
          <div className="stories">{storyCol3}</div>
          </div>
        </>
      ) : (
        <div className="stories-spinner">
          <Spinner />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.stories.loading,
    storiesArray: state.stories.stories,
    token: state.auth.token,
    userId: state.auth.userId,
    storyModalReset: state.modal.show,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStories: (token) => dispatch(actions.fetchingStory(token)),
    storyModalOpen: () => dispatch(actions.modalOpen()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Stories, axios));
