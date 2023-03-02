import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../Hooks/useAuthContext'
import Button from '@mui/material/Button'

export default function NewReplyComponent(props) {
    const topic = props.topic
    const { user } = useAuthContext()
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        // e.preventDefault()

        if (!user) {
          setError('You must be logged in')
          return
        }

        if (content.length < 20){
          setError('Post length must be at least 20 characters.')
          e.preventDefault()
          return
        }
      
        if (content.length > 300){
          setError('Post length can be at most 300 characters.')
          e.preventDefault()
          return
        }

        const userId = user.id
        const isReply = true
        const replyTo = props.post
        // console.log(userId)

        const post = {user: userId, content, isReply, replyTo, discussionId: topic} //line up with Node req's
        const uri = '/api/discuss/post'

        // setLoading(true)

        const response = await fetch(uri, {
            method: 'POST',
            body: JSON.stringify(post),
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
          console.log("successfully posted")
          
        //   dispatch({type: 'UPDATE_NOTE', payload: json})

        //   setLoading(false);
          }
          
    }



  return (true) ? (
    <div className='replyDiv'>
        {/* <h1>New Post</h1> */}
        <br />
        
      <form onSubmit={handleSubmit}>
        {/* <label>New Reply</label> */}
        {/* <p>{props.post}</p> */}
        <textarea 
            className='inlinePost'
            type="textarea" 
            onChange={(e) => setContent(e.target.value)}
            // placeholder='Post'
            name="" id="" 
        />
        <p className='charLength' >{content.length + " characters out of 350"}</p>
        {/* <button>Post</button> */}
        <Button className='postButton' size="small" variant="contained" onClick={() => handleSubmit()}>
          Post
        </Button>
        
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  ) : ''
}
