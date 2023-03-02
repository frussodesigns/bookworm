import { BookNotesContext } from "../Context/BookNotesContext"
import { useContext } from "react"

export const useBookNotesContext = () => {
    const context = useContext(BookNotesContext)

    if (!context) {
        throw Error ('useBookNotesContext must be used inside ContextProvider')
    }

    return context
}