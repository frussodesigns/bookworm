import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../Hooks/useAuthContext'
import Button from '@mui/material/Button'

export default function NewPostComponent(props) {
    const topic = props.topic
    const bookId = props.bookId
    const { user } = useAuthContext()
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        // e.preventDefault()

        if (!user) {
          setError('You must be logged in')
          return
        }

        if (props.content.length < 20){
          props.setError('Post length must be at least 20 characters.')
          e.preventDefault()
          return
        }
      
        if (props.content.length > 350){
          props.setError('Post length can be at most 300 characters.')
          e.preventDefault()
          return
        }

        const userId = user.id
        const isReply = false
        const replyTo = null
        console.log(userId)

        const post = {user: userId, content: props.content, isReply, replyTo, discussionId: topic, bookId} //line up with Node req's
        const uri = '/api/discuss/post'

        // setLoading(true)

        const response = await fetch(process.env.REACT_APP_API + uri, {
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


  return (
    <div className='replyDiv' >
        {/* <h1>New Post</h1> */}
        <br />
      <form onSubmit={handleSubmit}>
        {/* <label>New Post</label> */}
        <textarea 
            className='inlinePost'
            type="textarea" 
            onChange={(e) => props.setContent(e.target.value)}
            value={props.content}
            // placeholder='Post'
            name="" id="" 
        />
        <p className='charLength'>{props.content.length + " characters out of 350"}</p>
        {/* <button>Post</button> */}
        <Button className='postButton' size="small" variant="contained" onClick={() => handleSubmit()}>
          Post
        </Button>
      </form>
    </div>
  )
}
