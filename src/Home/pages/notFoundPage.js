import React from 'react'

function notFoundPage(props) {
    return (
        <div className='text'>
          <b> 404-Page Not Found</b>
          <button className='redirectButton' onClick={()=>props.history.push('/home')}>Go To Homepage</button>
        </div>
    )
}

export default notFoundPage
