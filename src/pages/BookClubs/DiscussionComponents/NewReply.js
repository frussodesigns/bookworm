import React, {useState} from 'react'
import { Button } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { newClubPost } from '../BookClubApiCalls';
import { useAuthContext } from '../../Hooks/useAuthContext'



export default function NewReply(props) {
  const { user } = useAuthContext()
  const [reply, setReply] = useState('')
  const isReply=true

  const handleUnlike = () => {}
  
  const handleSubmit = () => {
    newClubPost(user, isReply, props.id, reply)
  }


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

            <Link className='likeIcon' onClick={() => {}}><FavoriteBorderIcon /></Link>

          <p className='likesCounter' >{'0 likes'}</p>
          <p className='likesCounter' >{'0 views'}</p>
    </div>

    <div className="newBookButton">
          <Button size="small" variant="contained" onClick={() => {handleSubmit()}}>
              Submit
          </Button>
          <Button size="small" variant="contained" onClick={() => props.setReplyExpanded(false)}>
              Cancel
          </Button>
          </div>
    </>
  )
}
