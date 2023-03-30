import { NavLink, Outlet } from "react-router-dom"
import { useLogout } from "../pages/Hooks/useLogout"
import { useAuthContext } from "../pages/Hooks/useAuthContext"
import { useActivePageContext } from "../pages/Hooks/useActivePageContext"

import HomeIcon from '@mui/icons-material/Home';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from "react";

export default function RootLayout() {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { page, dispatch } = useActivePageContext()
    const [buttonCss, setButtonCss] = useState({
        home: "navButton",
        books: "navButton",
        notes: "navButton",
        discuss: "navButton",
        account: "navButton"
    })
    const [indicatorCss, setIndicatorCss] = useState("indicator")

    const handleSignout = () => {
        logout()
    }

    useEffect(() => {
        switch (page) {
            case 'Books':
                console.log("switching books")
                setButtonCss({
                    home: "navButton",
                    books: "navButton-active",
                    notes: "navButton",
                    discuss: "navButton",
                    account: "navButton"
                })
                setIndicatorCss("indicatorBooks")
                break
            case 'Notes':
                console.log("switching notes")
                setButtonCss({
                    home: "navButton",
                    books: "navButton",
                    notes: "navButton-active",
                    discuss: "navButton",
                    account: "navButton"
                })
                setIndicatorCss("indicatorNotes")
                break
            case 'Discuss':
                console.log("switching discuss")
                setButtonCss({
                    home: "navButton",
                    books: "navButton",
                    notes: "navButton",
                    discuss: "navButton-active",
                    account: "navButton"
                })
                setIndicatorCss("indicatorDiscuss")
                break
            case 'Account':
                setButtonCss({
                    home: "navButton",
                    books: "navButton",
                    notes: "navButton",
                    discuss: "navButton",
                    account: "navButton-active"
                })
                setIndicatorCss("indicatorAccount")
                break
            case 'Home':
                setButtonCss({
                    home: "navButton-active",
                    books: "navButton",
                    notes: "navButton",
                    discuss: "navButton",
                    account: "navButton"
                })
                setIndicatorCss("indicatorHome")
                break
                
            default:
                setButtonCss({
                    home: "navButton",
                    books: "navButton",
                    notes: "navButton",
                    discuss: "navButton",
                    account: "navButton"
                })
        }

        console.log(buttonCss)
    }, [page])
    
   
    return(
        <div className="root-layout">
            <header>
                <nav>
                    <NavLink 
                        onClick={() => dispatch({type: "SET_PAGE", payload: null})}
                        className="logo" 
                        to="/"
                    >
                        <h1>HARDCOVER</h1>
                    </NavLink>
                    {/* <p>{page}</p> */}
                    <NavLink 
                        onClick={() => dispatch({type: "SET_PAGE", payload: "Books"})}
                        className="navlinks" 
                        to="about"
                    >
                        Books
                    </NavLink>
                    <NavLink 
                        onClick={() => dispatch({type: "SET_PAGE", payload: "Notes"})}
                        className="navlinks" 
                        to="notes"
                    >
                        Notes
                    </NavLink>
                    <NavLink 
                        onClick={() => dispatch({type: "SET_PAGE", payload: "Discuss"})}
                        className="navlinks" 
                        to="about"
                    >
                        Discuss
                    </NavLink>
                    {!user && (
                    <div>
                    <NavLink className="navlinks" to="signin">Sign In</NavLink>
                    <NavLink className="navlinks" to="signup">Sign Up</NavLink>
                    </div>
                    )}
                    {user && (
                    <div>
                    {/* <span>{user.email}</span> */}
                    <button onClick={handleSignout}>Sign Out</button>
                    </div>
                    )}
                </nav>
            </header>

            <main>
                <Outlet />
                <div className="mobileSpacer" />
            </main>

            <div className="mobileNav">
            <div className="mobileNavFlex">
                <NavLink 
                    // style={({ isActive }) => ({
                    //     color: isActive ? '#fff' : '#545e6f',
                    //     background: isActive ? '#7600dc' : '#f0f0f0',
                    //   })
                    // }
                    onClick={() => dispatch({type: "SET_PAGE", payload: "Home"})}
                    to="/">
                    <div className={buttonCss.home}>
                        <HomeIcon className="navIcon" />
                        <p className="navLink">Home</p>
                    </div>
                </NavLink>
                <NavLink 
                    onClick={() => dispatch({type: "SET_PAGE", payload: "Notes"})}
                    to="notes">
                    <div className={buttonCss.notes}>
                        <NoteAltIcon className="navIcon" />
                        <p className="navLink">Notes</p>
                    </div>
                </NavLink>
                <NavLink 
                    onClick={() => dispatch({type: "SET_PAGE", payload: "Discuss"})}
                    to="about">
                    <div className={buttonCss.discuss}>
                        <ChatBubbleIcon className="navIcon" />
                        <p className="navLink">Discuss</p>
                    </div>
                </NavLink>
                <NavLink 
                    onClick={() => dispatch({type: "SET_PAGE", payload: "Account"})}
                    to="mobileAccount">
                    <div className={buttonCss.account}>
                        <AccountCircleIcon className="navIcon" />
                        <p className="navLink">Account</p>
                    </div>
                </NavLink>

                <div className={indicatorCss}></div>
            </div>
            </div>
                <div className="navBackground"></div>
                
            {/* <svg class="svg">
                <defs>
                    <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
                    <path d="M0.5,0 C0.776,0,1,0.224,1,0.5 C1,0.603,0.969,0.7,0.915,0.779 C0.897,0.767,0.876,0.76,0.853,0.76 C0.794,0.76,0.747,0.808,0.747,0.867 C0.747,0.888,0.753,0.908,0.764,0.925 C0.687,0.972,0.597,1,0.5,1 C0.224,1,0,0.776,0,0.5 C0,0.224,0.224,0,0.5,0"></path>
                    </clipPath>
                </defs>
            </svg> */}
        </div>
    )
}