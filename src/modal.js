import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

export default function Modal(props) {

    const handleClose = () => {
      props.setTrigger(false)
    //   setError(null)
    }

    
    

  return (props.trigger) ? (
    <>
    <div className="popup">
      <div className='popupInner'>
          {/* <h1>New Post</h1> */}
          {/* <button className='closeButton' onClick={() => handleClose()}>x</button> */}
          <CloseIcon className='closeButton' onClick={() => handleClose()} />
        {props.children}
      </div>
    </div>


    </>

  ) : ''
}
