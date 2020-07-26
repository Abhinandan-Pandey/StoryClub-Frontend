import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const intialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    userName:null,
}

const authStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true})
};

const authFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
};

const authSuccess=(state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        userName:action.userName,
        error:null,
        loading:false,
    });
};

const authLogout=(state,action)=>{
    return updateObject(state,{
        token:null,
        userId:null,
    });
};

const authRedirectPath=(state,action)=>{
    return updateObject(state,{
    })
}

const reducer=(state=intialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action); 
        case actionTypes.AUTH_REDIRECT_PATH:return authRedirectPath(state,action);
        default:
            return state;      
    };
};

export default reducer;
