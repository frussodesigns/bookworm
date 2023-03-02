import { NotesContext } from '../Context/NotesContext'
import { useContext } from 'react'

export const useNotesContext = () => {
    const context = useContext(NotesContext)

    if (!context) {
        throw Error('useNotesContext must be used inside NotesContextProvider')
    }

    return context
}