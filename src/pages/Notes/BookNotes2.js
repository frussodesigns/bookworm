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
  const [Ready, setReady] = useState(false)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [bookObj, setBook] = useState()
  const [chapObj, setChaps] = useState([])
  const [collapseObj, setCollapse] = useState([])
  const [collapseAllLast, setCollapseAll] = useState(true)


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
        console.log(json)
        setReady(true)
      }
    }
    
    if (user){
      fetchNotes()
      // fetchBook()
    }

  }, [dispatch, user])

  useEffect(() => {
    let prevChap = -1
    if (notes && notes.length > 0) {
      for (let i = 0; i < notes.length; i++){
        if (notes[i].chapter != prevChap){
          setChaps(old => (i === 0 ? [notes[i].chapter] : [...old, notes[i].chapter]))
          setCollapse(old => (i === 0 ? [false] : [...old, false]))
          prevChap = notes[i].chapter
        }
      }
    }
    console.log(chapObj)
    console.log(collapseObj)
  }, [notes])
  
  
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

  const collapse = (index) => {
    const updatedArray = collapseObj.map((value, i) => i === index ? !collapseObj[index] : value)
    setCollapse(updatedArray)
  }
  const collapseAll = (index) => {
    const updatedArray = []
    if (collapseAllLast == true) {
      collapseObj.forEach(() => updatedArray.push(true))
      setCollapseAll(false)
    }
    else{
      collapseObj.forEach(() => updatedArray.push(false))
      setCollapseAll(true)
    }
    // collapseObj.forEach(() => updatedArray.push(true))
    
    setCollapse(updatedArray)
  }
  
  if (!Ready){ 
    return(
      <main className='loadingBound'>
        <div className='loadingContainer'>
          <p className="loading-dots">
            loading
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      </main>
    )
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
        <Link onClick={()=>collapseAll()}>
          <Button variant="contained">Collapse</Button>
        </Link>
        <div className="gap"></div>
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
        {
          chapObj && chapObj.map((chap, index) => (
            <>
            <Link onClick={() => collapse(index)}>
              <h4>{"Chapter " + chap}</h4>
            </Link>
            <div>
            {notes && notes.map((note) => (
              <>
              {note.chapter == chap && collapseObj[index]==false ? 
                <Link to={'/notes/' + id + '/' + note._id + '/edit'} key={note._id}>
                <div className='aBook'>
                  <div className="bookInfo">
                  <Link to={'/notes/' + id + '/' + note._id + '/edit'} >
                    <p>{ note.remark }</p>
                  </Link>
                  </div>
                  <div className="del">
                  <IconButton aria-label="delete" onClick={(e) => {
                      e.preventDefault()
                      setDeleteToggle(note)
                  }}>
                    <DeleteIcon/>
                  </IconButton>
                  </div>
                </div>
              </Link> : null
              }
              </>
            ))}
            </div>
            </>
          ))
        }
        {/* {
        notes && notes.map((note) => (
          <Link to={'/notes/' + id + '/' + note._id + '/edit'} key={note._id}>
            <div className='aBook'>
              <div className="bookInfo">
              <Link to={'/notes/' + id + '/' + note._id + '/edit'} >
                <p>{ note.remark }</p>
              </Link>
              </div>
              <div className="del">
              <IconButton aria-label="delete" onClick={(e) => {
                  e.preventDefault()
                  setDeleteToggle(note)
              }}>
                <DeleteIcon/>
              </IconButton>
              </div>
            </div>
          </Link>
        ))
        } */}
      
    </main>
  )
        
}