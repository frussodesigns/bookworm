import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Chip from '../../../chip';

export default function ClubSettings() {

    const [mode, setMode] = useState('new')
    const [info, setInfo] = useState({
        title: '',
        members: [],
        currentBooks: [],
        completedBooks: [],
    })

    const handleFocus = (event) => event.target.select()

    const handleSubmit = async (e) => {
        //modify club api
    }

  return (
    <div>

        <div className='header'>
        <h3 className='headerTitle'>Book Club Settings</h3>
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
            <label>Members:</label>
            <div className="list">
                <Chip del={true} title={'test'} click={()=>{}} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'Morgan-Stanley-Madison'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
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
