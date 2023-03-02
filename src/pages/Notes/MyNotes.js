import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'
import NewBookSelector from './NewBookSelector'
import BookDeleteConfirm from './BookDeleteConfirm'
import { useBookNotesContext } from '../Hooks/useBookNotesContext'
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


export default function MyNotes() {
  const { id } = useParams()

  // const {notes, dispatch} = useNotesContext()
  // const [books, setBooks] = useState()
  const [newBook, setNewBook] = useState(false)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const { user } = useAuthContext()

  const {books, dispatch} = useBookNotesContext()

  const bookNotes = useLoaderData()  

  useEffect(() => {
    console.log(user)
    const fetchBooks = async () => {
      const response = await fetch('/api/notes/books', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      console.log(json)

      
      if (response.ok) {
        dispatch({type: "SET_BOOKS", payload: json})
      }
    }
    
    if (user){
      fetchBooks()
    }

  }, [])
  
  useEffect(() => {
    console.log(books)
  }, [books])


  const deleteBook = async (book) => {
    
    const response = await fetch('/api/notes/books/' + book._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      console.log('deleting')
      console.log(json)
      dispatch({type: 'DELETE_BOOK', payload: json})
    }
  }
  

  return (
    <main className='pageContainer'>

      <div className='header'>
      <h3 className='headerTitle'>My Notes</h3>

        {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
        <div className='newBookButton'>
        <Button className='newBookButton' onClick={() => setNewBook(!newBook)} variant="contained">New Book</Button>
        </div>
      </div>
      {newBook && <NewBookSelector></NewBookSelector>}
      {deleteToggle && <BookDeleteConfirm deleteToggle={deleteToggle} setDeleteToggle={setDeleteToggle} deleteBook={deleteBook} />}
      <br />

        {books && books.map((book) => (
          <Link to={'/notes/' + book._id}  key={book.gId}>
          <div className='aBook'>
            <div className="bookInfo">
              <h3 className='bookTitle'>{ book.title }</h3>
            
              <p className='by' >{"by " + book.author }</p>
            </div>
            
            {/* <span onClick={() => {deleteBook(book)}}>delete</span> */}
            <div className="del">
              <IconButton aria-label="delete" onClick={(e) => {
                  e.preventDefault()
                  setDeleteToggle(book)
              }}>
                <DeleteIcon/>
              </IconButton>
            </div>
          </div>
          </Link>
        ))}
      
    </main>
  )
}

export const bookNotesLoader = async ({ params }) => {
  const { id } = params
  const uri = "/api/notes/"


  const response = await fetch(uri)
  const json = await response.json()

  // console.log(response)

  return json

}
