import React, {useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import AReply from './AReply'
import NewReply from './NewReply'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function APost({title, user, timestamp, remark, likes, liked, views, replies}) {
  
    const handleLike = () => { }
    const handleUnlike = () => { }
    const handleReply = () => { }

    const [expanded, setExpanded] = useState(false)
    const [replyExpanded, setReplyExpanded] = useState(false)

  
  
    return (
    <div className="aPost">
        {/* <h3 className='bookTitle'>{ title }</h3> */}
        <h4 className='bookTitle'>{ remark }</h4>
        <p className='postInfo'>{"by " + user + " posted " + new Date(timestamp).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>
        {/*reply button*/}
        <div className='likeComponent' >
              {expanded && <ExpandMoreIcon onClick={() => setExpanded(false)} />}
              {!expanded && <ExpandLessIcon onClick={() => setExpanded(true)} />}
              <p className='likesCounter' >{replies.length + ' replies'}</p>
              <p className='likesCounter' >{views + ' views'}</p>
              {liked==false && 

                <Link className='likeIcon' onClick={() => handleLike()}><FavoriteBorderIcon /></Link>
              }
              {liked==true && 
                <Link className='likeIcon' onClick={() => handleUnlike()}><FavoriteIcon /></Link>
              }

              <p className='likesCounter' >{likes + ' likes'}</p>
        </div>
        {expanded&&
        <div className="repliesContainer">
          {/* <h4 className='bookTitle'>{ 'Replies:' }</h4> */}
          <br />
            {replies && replies.map((reply, index) => (
              <div className="aPost">
                <AReply replies={replies} index={index} />
              </div>
            ))
            
            }

            {replyExpanded&&
              <div className="aPost">
                <NewReply />
              </div>
            }

          {/* <br /> */}
          {!replyExpanded&&
          <Button size="small" variant="contained" onClick={() => setReplyExpanded(old => !old)}>
              Reply
          </Button>
          }
          {replyExpanded&&
          <div className="newBookButton">
          <Button size="small" variant="contained" onClick={() => setReplyExpanded(old => !old)}>
              Submit
          </Button>
          <Button size="small" variant="contained" onClick={() => setReplyExpanded(old => !old)}>
              Cancel
          </Button>
          </div>
          }
        </div>
        }
    </div>
  )
}
