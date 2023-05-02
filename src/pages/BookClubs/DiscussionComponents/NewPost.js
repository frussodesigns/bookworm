import React, {useState, useEffect} from 'react'
import { Button } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { newClubPost } from '../BookClubApiCalls';
import { useAuthContext } from '../../Hooks/useAuthContext'

export default function NewPost(props) {
  const { user } = useAuthContext()

  const [reply, setReply] = useState('')

  const isReply = false

  useEffect(() => {
    console.log(props.setReplyExpanded)
    console.log(props.id)
  
  }, [])
  

  const handleSubmit = () => {
    // console.log('submitted')
    newClubPost(user, isReply, props.id, reply)
    setReply('')
    props.setReplyExpanded(false)
  }
  const handleUnlike = () => {}

  return (
    <>
    {/* <h4 className='bookTitle'>{ 'remark' }</h4> */}
    <br />
    <form onSubmit={handleSubmit}>
          {/* <label>New Post</label> */}
          <textarea 
              className='inlinePost'
              type="textarea" 
              onChange={(e) => {setReply(e.target.value)}}
              value={reply}
              // placeholder='Post'
              name="" id="" 
          />
    </form>
    <p className='postInfo'>{"by currentUser" + " posted " + new Date().toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>
    <div className='likeComponent' >
          <ExpandLessIcon />
          <p className='likesCounter' >{'0 replies'}</p>

          <Link className='likeIcon' onClick={() => {}}><FavoriteBorderIcon /></Link>
          <p className='likesCounter' >{'0 likes'}</p>
          <p className='likesCounter' >{'0 views'}</p>
    </div>

    <div className='newBookButton'>
          <Button className='newBookButton' onClick={() => handleSubmit()} variant="contained">Submit</Button>
          <Button className='newBookButton' onClick={() => props.setReplyExpanded(old => !old)} variant="contained">Cancel</Button>
      </div>
    </>
  )
}
