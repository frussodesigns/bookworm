import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Link, useLoaderData, useParams, useNavigate, useLocation } from 'react-router-dom'
import APost from './DiscussionComponents/APost'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NewPost from './DiscussionComponents/NewPost';
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'

export default function Discussion() {
    const location = useLocation();

    const [authorized, setAuthorized] = useState(false)
    const [club, setClub] = useState()
    const [book, setBook] = useState()
    const [discussion, setDiscussion] = useState()
    const [resultsPage, setResultsPage] = useState(1)
    const [resultsPages, setResultsPages] = useState(5)
    const [posts, setPosts] = useState([
        {
            user: 'billy88',
            timestamp: new Date("2021-03-24"),
            remark: 'first post',
            likes: 0,
            liked: false,
            views: 8,
            replies: [
                {
                    user: 'billy88',
                    timestamp: new Date("2021-03-25"),
                    remark: 'first reply',
                    likes: 0,
                    liked: false,
                    views: 0,
                },
                {
                    user: 'mindyy88',
                    timestamp: new Date("2021-03-25"),
                    remark: 'second reply',
                    likes: 0,
                    liked: false,
                    views: 0,
                },
            ]
        },
        {
            user: 'cindy88',
            timestamp: new Date("2021-03-25"),
            remark: 'second post',
            likes: 0,
            liked: false,
            views: 2,
            replies: [
                {
                    user: 'nodemon88',
                    timestamp: new Date("2021-03-25"),
                    remark: 'new reply',
                    likes: 0,
                    liked: false,
                    views: 0,
                },
                {
                    user: 'mindyy88',
                    timestamp: new Date("2021-03-25"),
                    remark: 'second new reply',
                    likes: 0,
                    liked: false,
                    views: 0,
                },
            ]
        },
    ])
    const [reply, setReply] = useState({
        remark: '',
        isReply: false,
        replyTo: -1,
    }) //current reply content
    const [replyExpanded, setReplyExpanded] = useState(false)
    const [postOpen, setPostOpen] = useState(false) //main post

    useEffect(() => {
        const array = location.pathname.split('/').filter(Boolean);
        setClub(array[1])
        setBook(array[2])
        setDiscussion(array[3].replace(/_/g, " "))
        console.log(array)
      }, [location])

    const newReply = () => {

    }

    const nextPage = () => { }
    const prevPage = () => { }

  return (
    <main className="pageContainer">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/bookclubs">
            Book Clubs
          </Link>
          <Link underline="hover" color="inherit" to={"/bookclubs/"+club}>
            {club && club.replace(/_/g, " ") + "'s Books"}
          </Link>
          <Link underline="hover" color="inherit" to={"/bookclubs/"+club+"/"+book}>
            {book && book.replace(/_/g, " ") + "'s Discussions"}
          </Link>
          <Typography color="text.primary">{discussion && discussion.replace(/_/g, " ") + "'s Discussions"}</Typography>
        </Breadcrumbs>


        <div className='header'>
            <h3 className='headerTitle'>{discussion}</h3>

            {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
            {/* <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => newReply()} variant="contained">New Reply</Button>
            </div> */}
        </div>

        <br />

        {posts && posts.map((post, index)=>(
            <APost 
                title={index == 0 && discussion}
                user={post.user}
                timestamp={post.timestamp}
                remark={post.remark}
                likes={post.likes}
                liked={post.liked}
                views={post.views}
                replies={post.replies}
            />
        ))}

        {replyExpanded&&
            <div className="aPost">
            <NewPost />
            </div>
        }

        {!replyExpanded &&
        <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => setReplyExpanded(old => !old)} variant="contained">New Reply</Button>
        </div>
        }
        {replyExpanded &&
        <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => setReplyExpanded(old => !old)} variant="contained">Submit</Button>
            <Button className='newBookButton' onClick={() => setReplyExpanded(old => !old)} variant="contained">Cancel</Button>
        </div>
        }

        {/*page selection*/}
        <div className="pgSelection">
          <Link className='nav-arrow' onClick={() => prevPage()}><NavigateBeforeIcon /></Link>
          <p className='nav-item'>{resultsPage + " / " + resultsPages}</p>
          <Link className='nav-arrow' onClick={() => nextPage()}><NavigateNextIcon /></Link>
        </div>
        
    </main>
  )
}
