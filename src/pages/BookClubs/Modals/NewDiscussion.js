import React, { useState, useEffect } from 'react'
import NewPost from '../DiscussionComponents/NewPost'
import Button from '@mui/material/Button';
import { useAuthContext } from '../../Hooks/useAuthContext'
import NewClubDiscussion from '../NewClubDiscussion';
import { newClubDiscussion } from '../BookClubApiCalls';


export default function NewDiscussion(props) {
    const { user } = useAuthContext()

    const [discussionInfo, setDiscussionInfo] = useState({
        title: '',
        post: '',
    })
    const [error, setError] = useState()
    const [buttonDisabled, setButtonDisabled] = useState(true)


    const handleFocus = (event) => event.target.select()

    const handleSubmit = async (e) => {
        // e.preventDefault()

        console.log('submitted')

        newClubDiscussion(user, props.club, props.book, discussionInfo)

        props.setTrigger(false)
    }

    useEffect(() => {
      if (discussionInfo.post.length > 7){
        setButtonDisabled(false)
      }
    
    }, [discussionInfo.post])
    
  
    return (
    <div>
        <div className='header'>
            <h3 className='headerTitle'>New Discussion</h3>
        </div>

        <br />

        <form className="add" onSubmit={handleSubmit}>
            {/* <h3>New Note:</h3> */}

            {/* <label>Title:</label> */}
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setDiscussionInfo(old => ({...old, title: e.target.value}))}
                onFocus={handleFocus}
                value={discussionInfo.title}
                placeholder='Discussion Title' />
            </div>
            {/* <label>Initial Post:</label> */}
            <div className="pgNumDiv">
                <textarea 
                className='ndBigField'
                type="textarea" 
                onChange={(e) => setDiscussionInfo(old => ({...old, post: e.target.value}))}
                onFocus={handleFocus}
                value={discussionInfo.post}
                placeholder='Start The Conversation' />
            </div>
            <p className='charLength' >{discussionInfo.post.length + " characters out of 350"}</p>
            {error && <div className="error">{error}</div>}
            {/* <button disabled={buttonDisabled}>Post</button> */}
            <Button onClick={() => handleSubmit()} size="small" variant="contained" disabled={buttonDisabled}>
                Post
            </Button>
        </form>
    </div>
  )
}
