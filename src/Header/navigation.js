import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../Store/actions/index';

function Navigation(props) {

    const logoutHandler=()=>{
       props.logout();
       props.history.push('/'); 
    }
    const homePageHandler=()=>{
        props.history.push('/home'); 
    }
    return (
        <div className='navigation'>
            <button className="home-button heading-1" onClick={homePageHandler}>Storyclub</button>
            <button className="simple-text-button logout-button heading-3" onClick={logoutHandler}>logout</button>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return {
        logout:()=>dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Navigation);

                            