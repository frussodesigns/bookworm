import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Hooks/useAuthContext'



export default function BookSelector(props) {
    const [results, setResults] = useState()
    const [query, setQuery] = useState("")
    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const { user } = useAuthContext()
    
    const [resultsExcerpt, setResultsExcerpt] = useState()
    const [resultsPage, setResultsPage] = useState(1)

    
    let sliceStart = resultsPage * 2 - 2
    let sliceEnd = resultsPage * 2
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
    
    //titleset useEffect
    useEffect(() => {
        if (props.titleSet == true){
          setShowAutocomplete(false)
          // console.log('titleSet')
        }
    }, [props.titleSet])

    //books useEffect
    // useEffect(() => {
    //     console.log(books)
    // }, [books])
    
    //search when params.query changes
    useEffect(() => {
        // console.log(props.query)

        if (props.titleSet == false){
          if (props.query.length > 2) setShowAutocomplete(true)
          else  setShowAutocomplete(false)
        }
        
        // console.log(query)

        if (props.titleSet == false){
        const fetchBooks = async () => {
            const api = '/api/notes/book/' + props.query

            if (props.query.length < 3) return

            const response = await fetch(process.env.REACT_APP_API + api, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            })
            const json = await response.json()
      
            
            if (response.ok) {
                setResults(json)
            }
          }

          fetchBooks()

          setResultsPage(1)

        }
          
    }, [props.query])

    const handleSelect = async (book) => {

      props.setBook(book)
      // setShowAutocomplete(false)

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

    // useEffect(() => {

    // }, [params.query])

  
    return (
    <div>
      {/* <form>
        <input type="text"
        placeholder='search...'
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())} />
      </form> */}
      {showAutocomplete &&
      <div>
      {/* <h3>Select from the following:</h3> */}

      <table>
        <tbody>
            <tr>
                <th>Book</th>
                <th>Author</th>
                {/* <th>Published</th> */}
            </tr>
            {resultsExcerpt && resultsExcerpt.map((item) => (
                    <tr key={item.result}>
                        <td><Link onClick={() => handleSelect(item)}>{item.title}</Link></td>
                        <td><Link onClick={() => handleSelect(item)}>{item.author}</Link></td>
                        {/* <td><Link onClick={() => handleSelect(item)}>{item.published}</Link></td> */}
                    </tr>
                
            ))}
        </tbody>
      </table>
      <div className="pgSelection">
        <Link className='nav-item' onClick={() => prevPage()}>{'<'}</Link>
        <p className='nav-item'>{resultsPage}</p>
        <Link className='nav-item' onClick={() => nextPage()}>{'>'}</Link>
      </div>
      </div>
      
    }
    </div>
  )
}
