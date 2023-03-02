import { createContext, useReducer } from "react";

export const ActivePageContext = createContext()

export const pageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return {
                page: action.payload
            }
        default:
            return state
    }
}

export const ActivePageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, {
        page: null
    })

    return(
        <ActivePageContext.Provider value={{...state, dispatch}}>
            { children }
        </ActivePageContext.Provider>
    )
} 