import { createContext, useReducer, useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";

export const AuthContext =  createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload,
                // exp: state.exp 
            }
        case 'LOGOUT':
            return { user: null,
                // exp: null 
            }
        // case 'UPDATE_EXP':
        //     return {user: state.user,
        //         exp: action.payload }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    // const [exp, setExp] = useState('')
    // const [error, setError] = useState('')

    // const CheckExpiryJWT = async (user) => {
    //     // console.log(user.token)
        
    //     console.log('checking expiry')
    //     const uri = "/api/notes/expiryJWT"
    //     const response = await fetch(process.env.REACT_APP_API + uri, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${user.token}`
    //           }
    //     })

    //     const json = await response.json()

    //     if (!response.ok) {
    //         setError(json.error)
    //     }
    //     if (response.ok) {
    //         setExp(json)
    //         const expDate = new Date(json*1000)
    //         dispatch({type: 'UPDATE_EXP', payload: expDate})
    //     }
    // }

    useEffect(() => {
        
        // const user = JSON.parse(localStorage.getItem('user'))
        // CheckExpiryJWT(user)
        
        // if (user) {
        //     dispatch({type: 'LOGIN', payload: user})
        // }
        
    }, [])

    // console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}