import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import { newClubBook } from './BookClubApiCalls';

export default function NewClubBook() {

    const [book, setBook] = useState(null)

    let params = useParams()
    const location = useLocation();

    useEffect(() => {
        const array = location.pathname.split('/').filter(Boolean);
        console.log(array)
        
        setBook(array[1])
        
    }, [location])

    useEffect(() => {
    //   console.log(isNew)
    //   console.log(book)
    }, [book])
    
    

    const [mode, setMode] = useState('new')
    const [info, setInfo] = useState({
        title: '',
        members: [],
        currentBooks: [],
        completedBooks: [],
    })

    const handleFocus = (event) => event.target.select()

    const handleSubmit = async (e) => {
        //new book api
        NewClubBook()
    }


  return (
    <main className="pageContainer">

        <div className='header'>
        { book &&
            <h3 className='headerTitle'>{book.replace(/_/g, " ")}'s New Book</h3>
        }
        
        </div>
        
        <br/>

        <form className="add" onSubmit={handleSubmit}>
            {/* <h3>New Note:</h3> */}

            <label>Book:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setInfo(old => ({...old, title: e.target.value}))}
                onFocus={handleFocus}
                value={info.title} />
            </div>
           
            {/* <label>Chapter Name:</label>
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setChapterTitle(e.target.value)}
                value={chapterTitle} />
            <label>Page Number:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="number"
                onChange={(e) => setPage(e.target.value)}
                value={page} />
            </div>
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
            </div> */}
            <br />
            <div className="saveButton">
            <Button className='saveButton2' type="submit" variant="contained">Save</Button>
            </div>
            {/* <button>Add Note</button> */}
            {/* {error && <div className="error">{error}</div>} */}
        </form>

        <br />

    </main>
  )
}
