import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { newClub } from '../BookClubApiCalls'
import { useAuthContext } from '../../Hooks/useAuthContext';

export default function NewClub(props) {
    const { user } = useAuthContext()

    const [error, setError] = useState(false)
    const [mode, setMode] = useState('new')
    const [info, setInfo] = useState({
        title: '',
    })

    const handleFocus = (event) => event.target.select()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newClub(user, info, setError)) props.setTrigger(false)
    }

  return (
    <div>

        <div className='header'>
        <h3 className='headerTitle'>New Book Club</h3>
        </div>
        
        <br/>

        <form className="add" onSubmit={handleSubmit}>
            {/* <h3>New Note:</h3> */}

            <label>Title:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setInfo(old => ({...old, title: e.target.value}))}
                onFocus={handleFocus}
                value={info.title} />
            </div>
            {/* <label>Members:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setInfo(old => ({...old, members: [...old.members, e.target.value]}))}
                onFocus={handleFocus}
                value={info.members} />
            </div>
            <label>Current Books:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setInfo(old => ({...old, currentBooks: [...old.currentBooks, e.target.value]}))}
                onFocus={handleFocus}
                value={info.currentBooks} />
            </div>
            <label>Completed Books:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setInfo(old => ({...old, completedBooks: [...old.completedBooks, e.target.value]}))}
                onFocus={handleFocus}
                value={info.completedBooks} />
            </div> */}
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
            <div className="saveButton">
            <Button className='saveButton2' type="submit" variant="contained">Save</Button>
            </div>
            {/* <button>Add Note</button> */}
            {/* {error && <div className="error">{error}</div>} */}
        </form>

        <br />

    </div>
  )
}
