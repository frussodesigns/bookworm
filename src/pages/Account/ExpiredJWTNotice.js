import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from "react-router-dom"
import { useLogout } from '../Hooks/useLogout';

export default function ExpiredJWTNotice(props) {

    const navigate = useNavigate()
    const { logout } = useLogout()

    const handleConfirm = async (book) => {
        console.log("confirmed")
        props.deleteBook(book)
        props.setDeleteToggle(false)

        // e.preventDefault()

        // if (!user) {
        //   setError('You must be logged in')
        //   return
        // }
    }

  return (
    <div className="popup">
        <div className="popupInner">
            <CloseIcon className='closeButton' onClick={() => props.setDeleteToggle(false)} />

            <h3>Auto Sign Out</h3>
            <div>Your previous session has expired. You have been automatically signed out. Click the button below to sign in again.</div>
            <div className="twoButton">
                <NavLink to="signin">
                    <Button onClick={() => {
                        logout()
                        props.setExpired(false)
                        navigate('/signin')
                    }} size="small" variant="contained">
                        Sign In
                    </Button>
                </NavLink>
                
            </div>
        </div>
    </div>
  )
}
