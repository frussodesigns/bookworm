import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'


export default function MobileAccount() {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleSignout = () => {
        logout()
    }


  return (
    <>
    {!user &&
        <>
        <br />
        <div className="pageContainer">
            <NavLink to="/signin">
                <h2>Sign In</h2>
            </NavLink>
        </div>
        <br />
        <div className="pageContainer">
            <NavLink to="/signup">
                <h2>Sign Up</h2>
            </NavLink>
        </div>
        </>
    }
    {user &&
    <>
        <br />
        <div className="pageContainer">
            <Link onClick={handleSignout}>
                <h2>Sign Out</h2>
            </Link>
        </div>
    </>
    }
    </>
  )
}
