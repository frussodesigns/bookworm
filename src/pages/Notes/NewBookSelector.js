import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useBookNotesContext } from '../Hooks/useBookNotesContext'
import { newClubBook } from '../BookClubs/BookClubApiCalls'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function NewBookSelector(props) {
    const [results, setResults] = useState()
    const [query, setQuery] = useState("")
    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const { user } = useAuthContext()
    
    const [resultsExcerpt, setResultsExcerpt] = useState()
    const [resultsPage, setResultsPage] = useState(1)

    const {books, dispatch} = useBookNotesContext()
    
    let sliceStart = resultsPage * 5 - 5
    let sliceEnd = resultsPage * 5
    // if (results) {setResultsExcerpt(results.slice(0,5))}

    //results useEffect
    useEffect(() => {

        if (results) {setResultsExcerpt(results.slice(sliceStart,sliceEnd))}
    }, [results])

    //page useEffect
    useEffect(() => {
        console.log(resultsPage)
        if (results) {setResultsExcerpt(results.slice(sliceStart,sliceEnd))}
    }, [resultsPage])

    //books useEffect
    useEffect(() => {
        console.log(books)
    }, [books])
    
    useEffect(() => {
        if (query.length > 2) setShowAutocomplete(true)
        else  setShowAutocomplete(false)


        console.log(query)

        // console.log(query)

        const fetchBooks = async () => {
            const api = '/api/notes/book/' + query

            if (query.length < 3) return

            const response = await fetch(process.env.REACT_APP_API + api, {
              
            })
            const json = await response.json()
      
            
            if (response.ok) {
                setResults(json)
                // console.log(results[0])
            }
          }

          fetchBooks()

          setResultsPage(1)
          
    }, [query])

    const handleSelect = async (id, title, author, published, publisher) => {

      if (!props.version) {
        legacyHandleSelect(id, title, author)
        return
      }

      if (props.version === 2) {
        newClubBook(user, id, title, author, published, publisher, props.clubName)
        return
      }

    }

    const legacyHandleSelect = async (id, title, author) => {

        //prep payload
        const newBook = {userId: user.id, gId: id, title: title, author: author}

        const uri = "/api/notes/books/"+id

        if (!user){
            // setError('You must be logged in')
            return
          }

        const response = await fetch(process.env.REACT_APP_API + uri, {
            method: 'POST',
            body: JSON.stringify(newBook),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
        })

        const json = await response.json()

        if (!response.ok) {
            // setError(json.error)
        }
        if (response.ok) {
            console.log('response.ok')
            console.log(json)
            //update bookNotes context
            newBook._id = json._id
            dispatch({type: "ADD_BOOK", payload: newBook})

            //reset query
            setQuery('')
        }


        console.log(books)
        console.log(newBook)

    }

    const nextPage = () => {
        console.log("next page")
        setResultsPage(resultsPage+1)
        console.log(resultsPage)
    }
    const prevPage = () => {
        if (resultsPage > 1){
        setResultsPage(resultsPage-1)
        console.log(resultsPage)
        }
    }

  
    return (
    <div>
      <form>
        <div className='test'>
        <input type="text"
        className='searchField'
        placeholder='search...'
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </div>
      </form>
      {showAutocomplete &&
      <div className='aPost'>
      <table>
        <tbody>
            <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Published</th>
            </tr>
            {resultsExcerpt && resultsExcerpt.map((item) => (
                
                    <tr key={item.result}>
                        <td><Link onClick={() => handleSelect(item.id, item.title, item.author, item.published, item.publisher)}>{item.title}</Link></td>
                        <td><Link onClick={() => handleSelect(item.id, item.title, item.author, item.published, item.publisher)}>{item.author}</Link></td>
                        <td><Link onClick={() => handleSelect(item.id, item.title, item.author, item.published, item.publisher)}>{item.published}</Link></td>
                    </tr>
                
            ))}
        </tbody>
      </table>
      <div className="pgSelection">
        <Link className='nav-arrow' onClick={() => prevPage()}><NavigateBeforeIcon /></Link>
        <p className='nav-item'>{resultsPage}</p>
        <Link className='nav-arrow' onClick={() => nextPage()}><NavigateNextIcon /></Link>
      </div>
      </div>
      
    }
    </div>
  )
}
