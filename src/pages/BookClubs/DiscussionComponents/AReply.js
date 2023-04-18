import React from 'react'
import { useParams, Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function AReply({replies, index}) {

  console.log(replies)

  const handleLike = () => {}
  const handleUnlike = () => {}

  return (
    <>
    <h4 className='bookTitle'>{ replies[index].remark }</h4>
    <p className='postInfo'>{"by " + replies[index].user + " posted " + new Date(replies[index].timestamp).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>
    <div className='likeComponent' >
          {replies[index].liked==false && 

            <Link className='likeIcon' onClick={() => handleLike()}><FavoriteBorderIcon /></Link>
          }
          {replies[index].liked==true && 
            <Link className='likeIcon' onClick={() => handleUnlike()}><FavoriteIcon /></Link>
          }

          <p className='likesCounter' >{replies[index].likes + ' likes'}</p>
          <p className='likesCounter' >{replies[index].views + ' views'}</p>
    </div>
    </>
  )
}
