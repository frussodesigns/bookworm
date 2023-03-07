import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useNotesContext } from '../Hooks/useNotesContext'
import NoteDeleteConfirm from './NoteDeleteConfirm'

import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



export default function BookNotes() {
  const { id } = useParams()
  const { user } = useAuthContext()
  const { notes, dispatch } = useNotesContext()
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [bookObj, setBook] = useState()

  // const [notes, setNotes] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(process.env.REACT_APP_API + '/api/notes/books/'+id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      
      if (response.ok) {  
        dispatch({type: "SET_NOTES", payload: json.notes})
        setBook(json.book)
        console.log(notes)
      }
    }
    
    if (user){
      fetchNotes()
      // fetchBook()
    }

  }, [dispatch, user])
  
  
  // const { bookNotes } = useLoaderData() //await?
  
 const deleteNote = async (note) => {

    if (!user) {
      return
    }
    
    const response = await fetch(process.env.REACT_APP_API + '/api/notes/' + note._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_NOTE', payload: json})
    }
  }

  const clearContext = () => {
    dispatch({type: 'SET_NOTES', payload: null})

  }
  

  return (
    <main className='pageContainer'>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/notes">
          Notebook
        </Link>
        <Typography color="text.primary">{bookObj && bookObj.title}</Typography>
      </Breadcrumbs>

      {deleteToggle && <NoteDeleteConfirm deleteToggle={deleteToggle} setDeleteToggle={setDeleteToggle} deleteNote={deleteNote} />}

      <div className="header">
      <h3>{bookObj && bookObj.title}</h3>
      <div className='newBookButton'>
        <Link to={'/notes/' + id + '/new'}>
        <Button variant="contained">New Note</Button>
        </Link>
      </div>
      </div>
      {/* <Link to={"/notes"} onClick={() => {clearContext()}}>[Notebooks]</Link> */}
      {/* <Link to={'/notes/' + id + '/new'}>[new]</Link> */}

        {!notes || notes.length == 0 && 
          <div className="aBook"><p>It looks like you haven't yet created any notes for this book. Click "New Note" to create your first note.</p></div>
        }
        {notes && notes.map((note) => (
          <Link to={'/notes/' + id + '/' + note._id + '/edit'} key={note._id}>
            <div className='aBook'>
              <div className="bookInfo">
              <Link to={'/notes/' + id + '/' + note._id + '/edit'} >
                <p>{ note.remark }</p>
              </Link>
              </div>
              {/* <span onClick={() => {deleteNote(note)}}>delete</span> */}
              <div className="del">
              <IconButton aria-label="delete" onClick={(e) => {
                  e.preventDefault()
                  setDeleteToggle(note)
              }}>
                <DeleteIcon/>
              </IconButton>
              </div>
              {/* <Link to={'/notes/' + id + '/' + note._id + '/edit'}>edit</Link> */}
            </div>
          </Link>
        ))}
      
    </main>
  )
        
}