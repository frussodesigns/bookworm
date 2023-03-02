import { createContext, useReducer } from "react";

export const BookNotesContext = createContext()

export const bookNotesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return {
                books: action.payload
            }
        case 'ADD_BOOK':
            // if (state) return {books: [action.payload]}
            if (state)
            return {
                books: [action.payload, ...state.books]
            }
        case 'DELETE_BOOK':
            return {
                books: state.books.filter((n) => n._id !== action.payload._id)
            }
    }
}


export const BookNotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookNotesReducer, {
        books: []
    })

    return(
        <BookNotesContext.Provider value={{...state, dispatch}}>
            { children }
        </BookNotesContext.Provider>
    )
}