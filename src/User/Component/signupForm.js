import React, { useState } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../Store/actions/index';
import { useEffect } from 'react';

function SignupForm(props) {
    const[fullName,setFullName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const [errorMessage, setErrorMessage] = useState(null)

    const submitHandler=(event)=>{
        event.preventDefault()
        let form={
            fullName:fullName,
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            isSignup:true,
        };
        if(password===confirmPassword && fullName.trim()!==''){
        props.signup(form);
        }else if(password!==confirmPassword){
            setErrorMessage("Password doesn't match")
        }else{
            setErrorMessage("Please enter your name")
        }
        // console.log(form);
    }
    const fullNameHandler=(event)=>{
        setFullName(event.target.value)
    }
    const emailHandler=(event)=>{
        setEmail(event.target.value);
    }
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    }
    const confirmPasswordHandler=(event)=>{
        setConfirmPassword(event.target.value);
    }

    const {error}=props
    useEffect(()=>{
        setErrorMessage(error)
    },[error])
    return (
        <div className='box-layout__box'>
            <h1 className='heading-1 title'>Story Club</h1>
            <p className='heading-3'>Get Started - It's free</p>
            <p className="error">{errorMessage}</p>
            <form className='form' onSubmit={submitHandler}>
                <input  className='text-input' placeholder='Full Name' fullname='fullName' value={fullName} type='text' onChange={fullNameHandler} />
                <input  className='text-input' placeholder='E-mail' email='email' value={email} type='email' onChange={emailHandler} />
                <input className='text-input' placeholder='Password' password='password' value={password} type='password' onChange={passwordHandler} />
                <input className='text-input' placeholder='Confirm Password' confirmpassword='confirmPassword' value={confirmPassword} type='password' onChange={confirmPasswordHandler} />
                <button className='btn-primary'>Sign Up</button>
            </form>
            <div className="heading-3">
                Already have an account? &nbsp;
                <span>
                    <button className="simple-text-button" onClick={props.loginToogle}>Login</button>
                </span>
             </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        error:state.auth.error,
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        signup:(form)=>dispatch(actions.auth(form)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);
