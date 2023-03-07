import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import { useNotesContext } from '../Hooks/useNotesContext'
import { useAuthContext } from '../Hooks/useAuthContext'

export default function BookNotes() {
  const { id } = useParams()

  const {notes, dispatch} = useNotesContext()
  const user = useAuthContext()

  // const [notes, setNotes] = useState(null)

  const bookNotes = useLoaderData()

  useEffect (() => {

    if (bookNotes.length > 1) {

      dispatch({type: 'SET_NOTES', payload: bookNotes})
    }
    
    console.log(bookNotes)
    
  }, [])


  const deleteNote = async (note) => {
    
    const response = await fetch(process.env.REACT_APP_API + '/api/notes/' + note._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_NOTE', payload: json})
    }
  }
  

  return (
    <main>
      <div>{ "book: " + id }</div>
      <Link to={'/notes/' + id + '/new'}>[new]</Link>
        {notes && notes.map((note) => (
          <div key={note._id}>
            <Link to={'/notes/' + id + '/' + note._id + '/edit'} >
              <p>{ note.remark }</p>
            </Link>
            <span onClick={() => {deleteNote(note)}}>delete</span>
            <Link to={'/notes/' + id + '/' + note._id + '/edit'}>edit</Link>
          </div>
        ))}
      
    </main>
  )
}

export const bookNotesLoader = async ({ params }) => {
  const { id } = params
  const uri = "/api/notes/"


  const response = await fetch(process.env.REACT_APP_API + uri)
  const json = await response.json()

  // console.log(response)

  return json

}
