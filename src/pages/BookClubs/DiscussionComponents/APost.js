import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import AReply from './AReply'
import NewReply from './NewReply'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FaceIcon from '@mui/icons-material/Face';
import { newClubLike, newClubUnlike, newClubPost } from '../BookClubApiCalls'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useInView } from 'react-intersection-observer';
import { newView } from '../BookClubApiCalls'

export default function APost(props) {
    const { user } = useAuthContext()
    const { ref, inView } = useInView();
    const [viewedOnce, setViewedOnce] = useState(false)

    const handleView = () => {
      newView(props.id, user)
    }

    useEffect(() => {
      if (inView && viewedOnce == false) {

        setViewedOnce(true)
        // console.log(props.remark + 'Element is visible on screen!');
        // Call when the element is visible on screen
        handleView(props.id, user);
      }
    }, [inView]);
    
  
    const handleLike = () => { 
      newClubLike(props.id, user)
    }
    const handleUnlike = () => { 
      newClubUnlike(props.id, user)
    }
    const handleReply = () => { 
      newClubPost()
    }

    const expand = () => {
      setExpanded(true)
      if (props.replies > 0){
      }
    }

    const [expanded, setExpanded] = useState(false)
    const [replyExpanded, setReplyExpanded] = useState(false)

  
  
    return (
    <div className="aPost">
        {/* <h3 className='bookTitle'>{ title }</h3> */}
        <h4 ref={ref} className='bookTitle'>{ props.remark }</h4>
        <p className='postInfo'>{"by " + props.user + " posted " + new Date(props.timestamp).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>
        {/*reply button*/}
        <div className='likeComponent' >
            <div className='likeGroup'>
              <div className='likeIcon' ><FaceIcon /></div>
              <p className='likesCounter' >{props.views + ' views'}</p>
            </div>
            <div className='likeGroup'>
              {props.liked==false && 

                <Link className='likeIcon' onClick={() => handleLike()}><FavoriteBorderIcon /></Link>
              }
              {props.liked==true && 
                <Link className='likeIcon' onClick={() => handleUnlike()}><FavoriteIcon /></Link>
              }
              <p className='likesCounter' >{props.likes + ' likes'}</p>
            </div>
            <div className='likeGroup'>
              {expanded && <ExpandMoreIcon onClick={() => setExpanded(false)} />}
              {!expanded && <ExpandLessIcon onClick={() => expand()} />}
              <p className='likesCounter' >{props.replies + ' replies'}</p>
            </div>
        </div>
        {expanded&&
        <div className="repliesContainer">
          {/* <h4 className='bookTitle'>{ 'Replies:' }</h4> */}
          <br className='replyBr' />
            {props.repliesArray ? props.repliesArray.map((reply, index) => (
              <div className="aPost">
                <AReply replies={props.repliesArray} id={reply._id} index={index} />
              </div>
            ))
            :
            <div className="aPost">
              <NewReply id={props.id} setReplyExpanded={setReplyExpanded} />
            </div>
            }

            {replyExpanded&&
              <div className="aPost">
                <NewReply id={props.id} setReplyExpanded={setReplyExpanded} />
              </div>
            }

          {/* <br /> */}
          {!replyExpanded&& props.replies>0 &&
          <>
          <Button className='replyButton' size="small" variant="contained" onClick={() => setReplyExpanded(old => !old)}>
              Reply
          </Button>
          <div className="replyButtonBr"></div>
          </>
          }
          {/* {replyExpanded&&
          <div className="newBookButton">
          <Button size="small" variant="contained" onClick={() => setReplyExpanded(old => !old)}>
              Submit
          </Button>
          <Button size="small" variant="contained" onClick={() => setReplyExpanded(old => !old)}>
              Cancel
          </Button>
          </div>
          } */}
        </div>
        }
    </div>
  )
}
