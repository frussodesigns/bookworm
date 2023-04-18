import React, {useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



export default function NewPost() {

  const [reply, setReply] = useState('')

  const handleSubmit = () => {}
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
              onChange={() => {}}
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
    </>
  )
}
