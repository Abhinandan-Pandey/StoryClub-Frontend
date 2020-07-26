import React,{useState} from 'react'
import{connect} from 'react-redux';

import * as actions from '../../Store/actions/index';

function LoginForm(props) {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const submitHandler=(event)=>{
        event.preventDefault()
        let form={
            email:email,
            password:password,
            isSignup:false,
        }
        props.login(form);
    }
    const emailHandler=(event)=>{
        setEmail(event.target.value);
    }
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    }
    return (
        <div className='box-layout__box'>
            <h1 className='heading-1 title'>Story Club</h1>
            <p className='heading-3'>Get Started - It's free</p>
            <p className="error">{props.error}</p>
            <form className='form' onSubmit={submitHandler}>
                <input  className='text-input' placeholder='E-mail' email='email' value={email} type='email' onChange={emailHandler} />
                <input className='text-input' placeholder='Password' password='password' value={password} type='password' onChange={passwordHandler} />
                <button className='btn-primary'>Login</button>
            </form>
            <div className="heading-3">
                Need an account? &nbsp;
                <span>
                    <button className="simple-text-button" onClick={props.loginToogle}>sign up</button>
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
        login:(form)=>dispatch(actions.auth(form)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
