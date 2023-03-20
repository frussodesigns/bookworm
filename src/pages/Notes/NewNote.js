import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNotesContext } from '../Hooks/useNotesContext'
import { useAuthContext } from '../Hooks/useAuthContext'
import Button from '@mui/material/Button';

export default function NewNote() {

    const {notes, dispatch} = useNotesContext()
    const { user } = useAuthContext()
    const { id } = useParams()

    const bookId = id
    const bookTitle = "bbb"
    
    const uri = "/api/notes/"

    const [remark, setRemark] = useState('')
    const [pub, setPub] = useState(false)
    const [chapter, setChapter] = useState('')
    const [chapterTitle, setChapterTitle] = useState('')
    const [page, setPage] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user){
          setError('You must be logged in')
          return
        }

        const userId = user.email
        console.log(userId)

        const note = {remark, pub, userId, bookId, chapter, page, bookTitle, chapterTitle} //line up with Node req's

        const response = await fetch(process.env.REACT_APP_API + uri, {
            method: 'POST',
            body: JSON.stringify(note),
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

            setError('')
            setPage('')
            setChapterTitle('')
            setChapter('')
            setPub(false)
            setRemark('')
            setError(null)
            console.log("new note added")

            dispatch({type: 'CREATE_NOTE', payload: json})
        }
    }


  return (
    <main className='notes-page'>
      <div className='note-module'>
      <form className="add" onSubmit={handleSubmit}>
        <h3>New Note:</h3>

        <label>Chapter:</label>
            <input 
            className='ndField'
            maximum-scale={1}
            type="number"
            onChange={(e) => setChapter(e.target.value)}
            value={chapter} />
        <label>Chapter Name:</label>
            <input 
            className='ndField'
            type="text"
            onChange={(e) => setChapterTitle(e.target.value)}
            value={chapterTitle} />
        <label>Page Number:</label>
            <input 
            className='ndField'
            type="number"
            onChange={(e) => setPage(e.target.value)}
            value={page} />
        <label>Remark:</label>
            <textarea 
            className='remark'
            type="textarea"
            onChange={(e) => setRemark(e.target.value)}
            value={remark} />
        <div className="publicFlex">
        <label>Public: </label>
            <input 
            className='bool' 
            type="checkbox"
            onChange={(e) => setPub(e.target.checked)}
            value={pub} />
        </div>
        <div className="saveButton">
          <Button className='saveButton2' type="submit" variant="contained">Save</Button>
        </div>
        {/* <button>Add Note</button> */}
        {error && <div className="error">{error}</div>}
      </form>
      {/* <p>{"bookId: " + bookId}</p> */}
      </div>

      
      {/* <Link to={"/notes/"+bookId}>[Notes list]</Link> */}
      <div className='note-list'>
        <Link to={"/notes/" + id}>
          <h3>Notes:</h3>
        </Link>
      {notes && notes.map((note) => (
        <Link className='aBook' to={"/notes/" + bookId + "/" + note._id + "/edit"} key={note._id}>
          <p>{ note.remark }</p>
          {/* <p>{ note._id }</p> */}
        </Link>
      ))}

      {/* <p>{ notes }</p> */}
      
      {/* { id } */}
    </div>
    </main>
  )
}
