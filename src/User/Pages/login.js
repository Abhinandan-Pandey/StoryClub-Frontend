import React,{useState} from 'react';

import LoginForm from '../Component/loginForm';
import SignupForm from '../Component/signupForm';

const Login=()=>{

  const[isLogin,setIslogin]=useState(false);
  const isLoginHnandler=()=>{
    setIslogin(!isLogin);
  }
  
  let loginPage=<SignupForm loginToogle={isLoginHnandler} />
  if(isLogin){
    loginPage=<LoginForm loginToogle={isLoginHnandler}/>
  }
  
  return(
   <div className='box-layout'>
        {loginPage}
    </div>
  );
} 

export default Login;