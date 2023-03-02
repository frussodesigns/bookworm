import { useAuthContext } from "./useAuthContext"
import { useBookNotesContext } from "./useBookNotesContext"
import { useNotesContext } from "./useNotesContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: notesDispatch } = useNotesContext()
    const { dispatch: booksDispatch } = useBookNotesContext()

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout context action
        dispatch({type: 'LOGOUT'})
        notesDispatch({type: 'SET_NOTES', payload: null})
        booksDispatch({type: 'SET_BOOKS', payload: null})
    }

    return {logout}
}