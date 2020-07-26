import React from 'react'

function  profileEditModel(props) {
    return (
        <div className='profile-edit-form'>
           <input className='profile-input' type="text" onChange={props.onChange} value={props.value}/>
           <div className='profile-input-button-box'>
               <button className='profile-input-button' onClick={props.cancel}>Cancel</button>
               <button className='profile-input-button' onClick={props.save}>Save</button>
           </div>
        </div>
    )
}

export default profileEditModel
