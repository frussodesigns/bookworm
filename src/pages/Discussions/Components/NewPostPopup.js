import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../Hooks/useAuthContext'

export default function NewPostPopup(props) {
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
          setError('Post length must be at least 20 characters.')
          e.preventDefault()
          return
        }
      
        if (props.content.length > 350){
          setError('Post length can be at most 300 characters.')
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

    const handleClose = async () => {
      props.setTrigger(false)
      setError(null)
    }


  return (props.trigger) ? (
    <div className="popup">
      <div className='popupInner'>
          {/* <h1>New Post</h1> */}
          <br />
          <button className='closeButton' onClick={() => handleClose()}>x</button>
        <form onSubmit={handleSubmit}>
          <label>New Post</label>
          <textarea 
              className='inlinePost'
              type="textarea" 
              onChange={(e) => props.setContent(e.target.value)}
              value={props.content}
              // placeholder='Post'
              name="" id="" 
          />
          <p>{props.content.length + " characters out of 350"}</p>
          <button>Post</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  ) : ''
}
