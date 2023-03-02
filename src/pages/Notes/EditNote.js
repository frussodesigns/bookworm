import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNotesContext } from '../Hooks/useNotesContext'
import { useAuthContext } from '../Hooks/useAuthContext'
import Button from '@mui/material/Button';

export default function EditNote () {

    let { notes, dispatch } = useNotesContext()
    const { user } = useAuthContext()
    const { id, noteId } = useParams()

    // const user = "aaa"
    const bookId = id
    const bookTitle = "bbb"

    const uri = "/api/notes/" + noteId
    
    const [remark, setRemark] = useState('')
    const [pub, setPub] = useState()
    const [chapter, setChapter] = useState('')
    const [chapterTitle, setChapterTitle] = useState('')
    const [page, setPage] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //onMount useEffect:
    useEffect(() => {


      let index = null
    
      for (let i=0; i<notes.length; i++){
        if (notes[i]._id == noteId){
          index = i
        }
      }

      setRemark(notes[index].remark)
      setPub(notes[index].pub)
      setChapter(notes[index].chapter)
      setChapterTitle(notes[index].chapterTitle)
      setPage(notes[index].page)

    }, [])

    //new note clicked:
    const refreshNote = (id) => {

      let index = null

      for (let i=0; i<notes.length; i++){
        if (notes[i]._id == id){
          index = i
        }
      }

      setRemark(notes[index].remark)
      setPub(notes[index].pub)
      setChapter(notes[index].chapter)

      if (notes[index].chapterTitle) {
        setChapterTitle(notes[index].chapterTitle)
      }
      else{
        setChapterTitle('')
      }
      setPage(notes[index].page)

    }

    //note saved:
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
          setError('You must be logged in')
          return
        }

        const userId = user.email
        console.log(userId)

        const note = {remark, pub, userId, bookId, chapter, page, bookTitle} //line up with Node req's

        setLoading(true)

        const response = await fetch(uri, {
            method: 'PATCH',
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

          // setError('')
          setError(null)
          console.log("successfully patched")
          
          dispatch({type: 'UPDATE_NOTE', payload: json})

          setLoading(false);
          }
          
    }

    //log pub change
    useEffect(() => {
    // console.log("pubchange: " + pub)
    }, [pub])


  return (
    <main className='notes-page'>
      <div className='note-module'>
      <form className="add" onSubmit={handleSubmit}>
        <h3>Edit Note:</h3>

        <label>Chapter:</label>
            <input 
            className='ndField'
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
            key={Math.random()}
            onChange={(e) => setPub(e.target.checked)}
            defaultChecked={pub}
            value={pub} />
        </div>
            <br />
        <div className="saveButton">
          <Button className='saveButton2' type="submit" variant="contained">Save</Button>
        </div>
        {/* <button>Save</button> */}
        {error && <div className="error">{error}</div>}
      </form>
      {/* <p>{"bookId: " + bookId}</p> */}
      </div>

      {/* <Link to={"/notes/"+bookId}>[Notes list]</Link> */}
        <div className='note-list'>
          <div className="header">
            <Link to={"/notes/" + id}>
              <h3>Notes:</h3>
            </Link>
            {/* <Link to={'/notes/' + id + '/new'}>[new]</Link> */}
            <div className="newBookButton">
              <Link to={'/notes/' + id + '/new'}>
              <Button size='small' variant="contained">New Note</Button>
              </Link>
            </div>
          </div>
          <br />
          <Link className='aBook'><p>{remark}</p></Link>
          {notes && notes.filter((n) => n._id != noteId).map((note) => (
            <Link className='aBook' to={"/notes/" + bookId + "/" + note._id + "/edit"} onClick={ () => refreshNote(note._id) } key={note._id}>
              <p>{ note.remark }</p>
              {/* <p>{ note._id }</p> */}
            </Link>
          ))}
      </div>
    </main>
  )
}
