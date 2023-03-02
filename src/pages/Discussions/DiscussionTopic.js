import { useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import NewPostComponent from './Components/NewPostComponent'
import NewPostPopup from './Components/NewPostPopup'
import NewReplyComponent from './Components/NewReplyComponent'
import { useAuthContext } from '../Hooks/useAuthContext'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'

import Button from '@mui/material/Button'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function DiscussionTopic() {
  const { genre, book, topic } = useParams()
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [content, setContent] = useState('') //post content

  const [genreObj, setGenre] = useState()
  const [topicObj, setTopic] = useState()
  const [postsList, setPosts] = useState()
  const [bookObj, setBook] = useState()
  const [trigger, setTrigger] = useState(false)
  const [replyTrigger, setReplyTrigger] = useState(-1)

  const [resultsExcerpt, setResultsExcerpt] = useState()
  const [resultsPage, setResultsPage] = useState(1)
  const [pageLength, setPageLength] = useState(5)
  const [resultsPages, setResultsPages] = useState()


  const [justPosts, setJustPosts] = useState([])
  const [justReplies, setJustReplies] = useState([])
  
  let sliceStart = resultsPage * pageLength - pageLength
  let sliceEnd = resultsPage * pageLength
  

  const [newPost, setNewPost] = useState(false) //toggle lower new post component

  //api calls:
  useEffect(() => {
    //fetch topic name from id
    const fetchTopic = async () => {
      const response = await fetch('/api/discuss/topic/' + topic)
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        setTopic(json)
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    //fetch posts list
    const fetchPosts = async () => {
      let content = {}
      if(user){
        content = {userId: user.id, topic}
      }
      else{
        content = {topic}
        console.log('else')
      }
      // console.log(content)
      const uri = '/api/discuss/posts'

      const response = await fetch(uri, {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        setPosts(json)
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    //fetch book from id
    const fetchBook = async () => {
      const response = await fetch('/api/discuss/book/' + book)
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        setBook(json)
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    //fetch genre
    const fetchGenre = async () => {
      const response = await fetch('/api/discuss/genre/' + genre)
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        setGenre(json)
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    if (user){
      // console.log(user.id)
      fetchTopic()
      fetchPosts()
      fetchBook()
      fetchGenre()
    }

  }, [user])

  

  //create justReplies and justPosts state arrays
  useEffect(() => {
    if (postsList) {
      postsList.map((post) => {
        // console.log(post)
        if (post.isReply === false){
          // console.log("a post")
          setJustPosts(justPosts => [...justPosts, post])
        }
        else if (post.isReply === true){
          // console.log('a reply')
          setJustReplies(justReplies => [...justReplies, post])
        }
      })
    }
  }, [postsList])

  //set results excerpt based on selected page
  useEffect(() => {
      if (justPosts.length > 0) 
      setResultsExcerpt(justPosts.slice(sliceStart,sliceEnd))
  }, [justPosts, resultsPage])

  //just replies/posts console logs:
  useEffect(() => {
    // console.log(justReplies)
  }, [justReplies])

  //setup num pages
  useEffect(() => {
    // console.log(justPosts)
    const resultsPages = Math.ceil(justPosts.length / pageLength)
    setResultsPages(resultsPages)
  }, [justPosts])
  
  //toggle different pages
  const nextPage = () => {
    console.log("next page")
    if (resultsPage < resultsPages){
      setResultsPage(resultsPage+1)
    }
    console.log(resultsPage)
  }
  const prevPage = () => {
    if (resultsPage > 1){
    setResultsPage(resultsPage-1)
    console.log(resultsPage)
    }
  }

  //reply input trigger 
  const handleReply = (index) => {
    if (replyTrigger >=0){
      setReplyTrigger(-1)
    }
    else{
      setReplyTrigger(index)
    }
  }

  //like a post
  const handleLike = (id, liked, index) => {
      
      const post = { id, topic, userId: user.id }

      const like = async () => {
        const response = await fetch('/api/discuss/like', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        // console.log(json)
        
        if (response.ok) {
          // dispatch({type: "SET_BOOKS", payload: json})
          // console.log(resultsExcerpt[index].likes)
          resultsExcerpt[index].likes = resultsExcerpt[index].likes + 1
          // setResultsExcerpt(resultsExcerpt => [...resultsExcerpt])
          resultsExcerpt[index].liked = true
          setResultsExcerpt(resultsExcerpt => [...resultsExcerpt])
          // console.log(resultsExcerpt[index].likes)
          
        }
      }

      if (liked == false){
        like()
      }
  }

  //unlike a post
  const handleUnlike = (id, liked, index) => {
      
      const post = { id, topic, userId: user.id }

      const unlike = async () => {
        const response = await fetch('/api/discuss/unlike', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        // console.log(json)
        
        if (response.ok) {
          // dispatch({type: "SET_BOOKS", payload: json})
          resultsExcerpt[index].likes = resultsExcerpt[index].likes - 1
          resultsExcerpt[index].liked = false
          setResultsExcerpt(resultsExcerpt => [...resultsExcerpt])
        }
      }

      if (liked == true){
        unlike()
      }
  }

  //like a reply
  const handleLikeReply = (id, liked, index) => {
      
      const post = { id, topic, userId: user.id }

      const like = async () => {
        const response = await fetch('/api/discuss/like', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        // console.log(json)
        
        if (response.ok) {
          // dispatch({type: "SET_BOOKS", payload: json})
          justReplies[index].likes = justReplies[index].likes + 1
          justReplies[index].liked = true
          setJustReplies(justReplies => [...justReplies])
          
        }
      }

      if (liked == false){
        like()
      }
  }

  //unlike a reply
  const handleUnlikeReply = (id, liked, index) => {
      
      const post = { id, topic, userId: user.id }

      const unlike = async () => {
        const response = await fetch('/api/discuss/unlike', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        // console.log(json)
        
        if (response.ok) {
          // dispatch({type: "SET_BOOKS", payload: json})
          justReplies[index].likes = justReplies[index].likes - 1
          justReplies[index].liked = false
          setJustReplies(justReplies => [...justReplies])
        }
      }

      if (liked == true){
        unlike()
      }
  }

  const handleClose = () => {
    setNewPost(!newPost)
    setError(null)
  }

  return (
    <div className='pageContainer'>
      <NewPostPopup 
        trigger={trigger} 
        setTrigger={setTrigger} 
        bookId={book}
        content={content}
        setContent={setContent}
        /> {/*popup component, conditionally rendered*/}

      {/* <Link>[New Post]</Link> todo */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/discuss">
          Genres
        </Link>
        <Link underline="hover" color="inherit" to={"/discuss/"+genre}>
          {genreObj && genreObj.genre}
        </Link>
        {bookObj &&
        <Link underline="hover" color="inherit" to={"/discuss/" + genre + "/" + book}>
          {bookObj.title}
        </Link>
        }
        <Typography color="text.primary">{topicObj && topicObj.title}</Typography>
      </Breadcrumbs>


        {/* <button className='topNewPost' onClick={() => setTrigger(true)}>New Post</button> new post button */}
      

      {/*posts list */}
      <br/>  
      <div>
        {resultsExcerpt && resultsExcerpt.map((post, index) => (
          <div key={post._id}>
            <div className='aPost'>
              {index == 0 &&
                <h2 className='pageTitle'>
                {topicObj && topicObj.title} {/*topic title*/}
                </h2>
              }
              <h3 className='post'>{post.content}</h3> {/*post content*/}
              {/* <p>{index}</p> */}

              <p className='postInfo'>{"by " + post.user + " posted " + new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>
              
              <div className='likeComponent' >
              {post.liked==false && 

                <Link className='likeIcon' onClick={() => handleLike(post._id, post.liked, index)}><FavoriteBorderIcon /></Link>
              }
              {post.liked==true && 
                <Link className='likeIcon' onClick={() => handleUnlike(post._id, post.liked, index)}><FavoriteIcon /></Link>
              }

              <p className='likesCounter' >{post.likes + ' likes'}</p>
              </div>

              {/*reply button*/}
              <Button size="small" variant="contained" onClick={() => handleReply(index)}>
                Reply
              </Button>
              {/* <button onClick={() => handleReply(index)}>Reply</button> */}
              {(replyTrigger == index) && <NewReplyComponent post={post._id} topic={topic}/>} {/*new reply component, conditionally rendered*/}
              {/* <br /> */}
            </div>
            {/*replies*/}
            {justReplies && justReplies.map((reply, index) => {
              return reply.replyTo == post._id ? 
                <div className='replyParent'>
                  <div key={reply._id} className='reply'>
                    {/* <h4>Replies:</h4> */}
                    <h4>{reply.content}</h4>
                    <p className='postInfo' >{"by " + reply.user + " posted " + new Date(reply.createdAt).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>

                    <div className='likeComponent' >
                    {reply.liked==false && 
                      <Link className='likeIcon' onClick={() => handleLikeReply(reply._id, reply.liked, index)}><FavoriteBorderIcon /></Link>
                    }
                    {reply.liked==true && 
                      <Link className='likeIcon' onClick={() => handleUnlikeReply(reply._id, reply.liked, index)}><FavoriteIcon /></Link>
                    }

                    <p className='likesCounter'>{reply.likes + ' likes'}</p>
                    </div>
                    
                  </div>
                  </div>
                : 
                  ''
            })
            }

          </div>
        ))}
      </div>

      {/*lower new post button*/}
      <br />
      <Button size="small" variant="contained" onClick={() => handleClose()}>
        New Post
      </Button>
      {/* <button onClick={() => handleClose()}>New Post</button> */}
      {newPost && <NewPostComponent 
        topic={topic} 
        bookId={book} 
        error={error} 
        setError={setError}
        content={content}
        setContent={setContent}
        />} {/*lower new post component, conditionally rendered */}
      <br />
      {error && <div className="error">{error}</div>}


      {/*page selection*/}
      <div className="pgSelection">
        <Link className='nav-arrow' onClick={() => prevPage()}><NavigateBeforeIcon /></Link>
        <p className='nav-item'>{resultsPage + " / " + resultsPages}</p>
        <Link className='nav-arrow' onClick={() => nextPage()}><NavigateNextIcon /></Link>
      </div>
      
    </div>
  )
}
