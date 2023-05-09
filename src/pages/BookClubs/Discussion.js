import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Link, useLoaderData, useParams, useNavigate, useLocation } from 'react-router-dom'
import APost from './DiscussionComponents/APost'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NewPost from './DiscussionComponents/NewPost';
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { getClubPosts } from './BookClubApiCalls';
import { useAuthContext } from '../Hooks/useAuthContext'


export default function Discussion() {
    const { user } = useAuthContext()
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
    const [organizedPosts, setOrganizedPosts] = useState([])
    const [reply, setReply] = useState({
        remark: '',
        isReply: false,
        replyTo: -1,
    }) //current reply content
    const [replyExpanded, setReplyExpanded] = useState(false)
    const [postOpen, setPostOpen] = useState(false) //main post
    
    //set club, book, and discussion based on url
    useEffect(() => {
        const array = location.pathname.split('/').filter(Boolean);
        setClub(array[1])
        setBook(array[2])
        setDiscussion(array[3].replace(/_/g, " "))
        console.log(array)

        getClubPosts(user, array[1].replace(/_/g, " "), array[2].replace(/_/g, " "), array[3].replace(/_/g, " "), setPosts)
    }, [location])

    //setup organized posts
    useEffect(() => {
        console.log('posts logic')

        let tempPosts = []

        for (let i = 0; i < posts.length; i++){
            if (posts[i].isReply == false) tempPosts.push(posts[i])
            if (posts[i].isReply == true){
                for (let j = 0; j < tempPosts.length; j++){
                    if (tempPosts[j]._id.toString() == posts[i].replyTo){
                        console.log('match')
                        if (!tempPosts[j].repliesArr) tempPosts[j].repliesArr=[]
                        tempPosts[j].repliesArr.push(posts[i])
                        tempPosts[j].replies = tempPosts[j].replies +1 //delete later
                    }
                }
            }
        }
        console.log(tempPosts)
        setOrganizedPosts(tempPosts)

        console.log(organizedPosts)

    }, [posts])
    

    const newReply = () => {

    }

    const nextPage = () => { }
    const prevPage = () => { }

  return (
    <main className="pageContainerDiscussion">
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
          <Typography color="text.primary">{discussion && discussion.replace(/_/g, " ")}</Typography>
        </Breadcrumbs>


        <div className='header'>
            <h3 className='headerTitle'>{discussion}</h3>

            {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
            {/* <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => newReply()} variant="contained">New Reply</Button>
            </div> */}
        </div>

        <br />

        {organizedPosts && organizedPosts.map((post, index)=>(
            <APost 
                title={index == 0 && discussion}
                user={post.user}
                timestamp={post.createdAt}
                remark={post.content}
                likes={post.likes}
                liked={post.liked}
                views={post.views}
                replies={post.replies}
                repliesArray={post.repliesArr}
                id={post._id}
            />
        ))}

        {replyExpanded&&
            <div className="aPost">
            <NewPost id={posts[0]._id} setReplyExpanded={setReplyExpanded} />
            </div>
        }

        {!replyExpanded &&
        <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => setReplyExpanded(old => !old)} variant="contained">New Reply</Button>
        </div>
        }
        {/* {replyExpanded &&
        <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => setReplyExpanded(old => !old)} variant="contained">Submit</Button>
            <Button className='newBookButton' onClick={() => setReplyExpanded(old => !old)} variant="contained">Cancel</Button>
        </div>
        } */}

        {/*page selection*/}
        <div className="pgSelection">
          <Link className='nav-arrow' onClick={() => prevPage()}><NavigateBeforeIcon /></Link>
          <p className='nav-item'>{resultsPage + " / " + resultsPages}</p>
          <Link className='nav-arrow' onClick={() => nextPage()}><NavigateNextIcon /></Link>
        </div>
        
    </main>
  )
}
