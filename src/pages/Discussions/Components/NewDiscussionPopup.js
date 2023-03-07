import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../Hooks/useAuthContext'
import BookSelector from './BookSelector'
import NewBookGenrePopup from './NewBookGenrePopup'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

export default function NewDiscussionPopup(props) {
    const topic = props.topic
    const { user } = useAuthContext()
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const [bookTitle, setBookTitle] = useState('')
    const [discussionTitle, setDiscussionTitle] = useState('')
    const [bookObj, setBook] = useState()
    const [titleSet, setTitleSet] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [buttonDisabled2, setButtonDisabled2] = useState(true)
    const [genreTrigger, setGenreTrigger] = useState(false)
    const [genre, setGenre] = useState()
    
    const [fiction, setFiction] = useState([])
    const [nonFiction, setNonFiction] = useState([])
    
    const [ficNon, setFicNon] = useState(false)
    const [fictionSelect, setFictionSelect] = useState([
      {option: "Fiction"}, 
      {option: "Non-Fiction"}])
    

    //sets book if initial book prop exists
    useEffect(() => {
      if (props.book){
        setBookTitle(props.book.title)
        setBook(props.book)
        setTitleSet(true)
      }
    }, [props.trigger])

    useEffect(() => {
      // console.log(bookObj.title)
      if (bookTitle){
        setBookTitle(bookObj.title)
        setTitleSet(true)
        setButtonDisabled(false)
        console.log(bookObj)
        // console.log(bookObj._id)
      }
      
    }, [bookObj])

    useEffect(() => {
      // console.log(bookObj.title)
      if(bookObj){
        if (bookObj){
        if (bookTitle != bookObj.title){
          setTitleSet(false)
          setButtonDisabled(true)
          // console.log('title =! bookObj')
        }
      }
      else if (bookTitle == bookObj.title){
        setTitleSet(true)
      }
    }
    }, [bookTitle])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
          setError('You must be logged in')
          return
        }

        if (content.length < 20){
          setError('Post length must be at least 20 characters.')
          e.preventDefault()
          return
        }
      
        if (content.length > 350){
          setError('Post length can be at most 300 characters.')
          e.preventDefault()
          return
        }

        const userId = user.id
        const isReply = false
        const replyTo = null
        // console.log(userId)

        const post = {user: userId, discussionTitle, content, isReply, replyTo, book: bookObj._id} //line up with Node req's
        const uri = '/api/discuss/discussion'

        // setLoading(true)

        const response = await fetch(process.env.REACT_APP_API + uri, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()

        if (!response.ok) {
          
            if (json.error == "new book"){
              setGenreTrigger(true)
            }

            setError(json.error)
            
        }
        if (response.ok) {

          // setError('')
          setError(null)
          console.log("successfully posted")
          window.location.reload(false)
          
        //   dispatch({type: 'UPDATE_NOTE', payload: json})

        //   setLoading(false);
          }
          
    }

    useEffect(() => {
      console.log(bookObj)
  
    }, [bookObj])

    useEffect(() => {
      console.log(genre)
      if (genre == 'none'){
        setButtonDisabled2(true)
      }
      else(setButtonDisabled2(false))
  
    }, [genre])
    

    const handleSubmitGenre = async (e) => {
        // e.preventDefault()

        if (!user) {
          setError('You must be logged in')
          return
        }

        const userId = user.id
        const isReply = false
        const replyTo = null
        // console.log(userId)

        const post = {user: userId, discussionTitle, content, isReply, replyTo, book: bookObj, genre} //line up with Node req's
        const uri = '/api/discuss/discussion2'

        // setLoading(true)

        const response = await fetch(process.env.REACT_APP_API + uri, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {

          // setError('')
          setError(null)
          console.log("successfully posted")
          
        //   dispatch({type: 'UPDATE_NOTE', payload: json})

        //   setLoading(false);
          }
          
    }

    const handleClose = () => {
      props.setTrigger(false)
      setError(null)
    }

    useEffect(() => {
      const fetchGenres = async () => {
        const response = await fetch(process.env.REACT_APP_API + '/api/discuss/genres')
        const json = await response.json()
        // console.log(json)
  
        
        
        if (response.ok) {
          for (let i = 0; i < json.length; i++){
            if (json[i].fiction == false) {
              if (nonFiction.length == 0){
                setNonFiction((arr) => [...arr, json[i]])
                }
              }
            else{
              if (fiction.length == 0){
              setFiction((arr2) => [...arr2, json[i]])  
              }  
            }
          }
          console.log(fiction)
          // dispatch({type: "SET_BOOKS", payload: json})
        }
      }
      
      fetchGenres()
  
    }, [genreTrigger])

    useEffect(() => {
      console.log(ficNon)
      setGenre("none")
    }, [ficNon])
    
    
    

  return (props.trigger) ? (
    <>
    <div className="popup">
      <div className='popupInner'>
          {/* <h1>New Post</h1> */}
          {/* <button className='closeButton' onClick={() => handleClose()}>x</button> */}
          <CloseIcon className='closeButton' onClick={() => handleClose()} />
        <form onSubmit={handleSubmit}>
          <h3>New Discussion</h3>
          {/* <label>Book:</label> */}
            <input 
            className='ndField'
            type="text"
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder='Book'
            value={bookTitle} />

          <BookSelector query={bookTitle} book={bookObj} setBook={setBook} titleSet={titleSet}/>
            
          {/* <label>Discussion Title:</label> */}
            <input 
            className='ndField'
            type="text"
            onChange={(e) => setDiscussionTitle(e.target.value)}
            placeholder='Discussion Title'
            value={discussionTitle} />
            
          {/* <label>Start The Conversation:</label> */}
          <textarea 
              className='ndBigField'
              type="textarea" 
              onChange={(e) => setContent(e.target.value)}
              placeholder='Start The Conversation'
              name="" id="" 
          />
          <p className='charLength' >{content.length + " characters out of 350"}</p>
          {error && <div className="error">{error}</div>}
          {/* <button disabled={buttonDisabled}>Post</button> */}
          <Button onClick={() => handleSubmit()} size="small" variant="contained" disabled={buttonDisabled}>
            Post
          </Button>
        </form>
          {/* <button onClick={() => setGenreTrigger(true)}>Genre</button> */}
      </div>
    </div>

    {/* Select Genre Extra Popup */}
    {genreTrigger &&
    <div className="popup">
      <div className='popupInner-2'>
          {/* <h1>New Post</h1> */}
          <br />
          <button className='closeButton' onClick={() => setGenreTrigger(false)}>x</button>
        
        <form onSubmit={handleSubmitGenre}>
          <h3>Select {bookObj.title}'s Genre</h3>  
          <p>This will be the first discussion for {bookObj.title}.
            Please select its genre:</p>
          <label>Fiction or Nonfiction</label>
          <select 
          // value={genre} 
          onChange={(e) => setFicNon(e.target.value)}
          >
            <option value="none" selected disabled hidden>Select an Option</option>
            {fictionSelect && fictionSelect.map((aGenre) => 
              <option 
              key={aGenre._id}
              value={aGenre.option} 
              // selected={setGenre(aGenre)}
              >
                {aGenre.option}
              </option>
            )
          }
          </select>
          
          {ficNon && 
          <>
          <br />
          <label>Genre:</label>
          
          
            { (ficNon == "Fiction") ? 
            (
          <select 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)}
          >
          <option value="none" selected disabled hidden>Select an Option</option>
              
            {fiction && fiction.map((aGenre) => 
              <option 
                key={aGenre._id}
                value={aGenre._id} 
                // selected={setGenre(aGenre)}
              >
                {aGenre.genre}
              </option>
            )
            }
            </select>
            ) :
            (
          <select 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)}
          >
          <option value="none" selected disabled hidden>Select an Option</option>
              
            {nonFiction.map((aGenre) => 
              <option 
                key={aGenre._id}
                value={aGenre._id} 
                // selected={setGenre(aGenre)}
              >
                {aGenre.genre}
              </option>
            )
            }
            </select>

            )
            }
          
          </>
          }
          <br />
          <br />
          <button disabled={buttonDisabled2}>Post</button>
        </form>
      </div>
    </div>}

    </>

  ) : ''
}
