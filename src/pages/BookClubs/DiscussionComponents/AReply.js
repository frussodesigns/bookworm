import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FaceIcon from '@mui/icons-material/Face';
import { newClubLike } from '../BookClubApiCalls';
import { newClubUnlike } from '../BookClubApiCalls';
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useInView } from 'react-intersection-observer';
import { newView } from '../BookClubApiCalls'

export default function AReply({replies, index, id}) {
  const { user } = useAuthContext()
  const { ref, inView } = useInView();
  const [viewedOnce, setViewedOnce] = useState(false)

  const handleView = () => {
    newView(id, user)
  }

  useEffect(() => {
    if (inView && viewedOnce == false) {

      setViewedOnce(true)
      // console.log(replies[index].content + 'Element is visible on screen!');
      // Call when the element is visible on screen
      handleView(id, user);
    }
  }, [inView]);

  return (
    <>
    <h4 ref={ref} className='bookTitle'>{ replies[index].content }</h4>
    <p className='postInfo'>{"by " + replies[index].user + " posted " + new Date(replies[index].createdAt).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>
    <div className='likeComponent' >
      <div className="likeGroup">
          <div className='likeIcon' ><FaceIcon /></div>
          <p className='likesCounter' >{replies[index].views + ' views'}</p>
      </div>
      <div className="likeGroup">
          {replies[index].liked==false && 

            <Link className='likeIcon' onClick={() => newClubLike(id, user)}><FavoriteBorderIcon /></Link>
          }
          {replies[index].liked==true && 
            <Link className='likeIcon' onClick={() => newClubUnlike(id, user)}><FavoriteIcon /></Link>
          }

          <p className='likesCounter' >{replies[index].likes + ' likes'}</p>
      </div>
          
    </div>
    </>
  )
}
