import { ActivePageContext } from '../Context/ActivePageContext'
import { useContext } from 'react'

export const useActivePageContext = () => {
    const context = useContext(ActivePageContext)

    if (!context) {
        throw Error('useActivePageContext must be used inside ActivePageContextProvider')
    }

    return context
}