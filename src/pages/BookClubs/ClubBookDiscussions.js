import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Link, useLoaderData, useParams, useNavigate, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { getClubDiscussions } from './BookClubApiCalls'
import Modal from '../../modal'
import NewDiscussion from './Modals/NewDiscussion'
import { useAuthContext } from '../Hooks/useAuthContext'


// Book:
// - Title
// - Author
// - Posts Today
// - Last Post
// - Last Poster

const discussions = [
  {
    title: 'A Discussion',
    url: 'A_Discussion',
    lastPost: new Date("2021-03-25"),
    lastPoster: 'Jimmy88',
    postsToday: 8,
  },
  {
    title: 'Second Discussion',
    url: 'Second_Discussion',
    lastPost: new Date("2021-03-25"),
    lastPoster: 'Jimmy88',
    postsToday: 8,
  },

]

export default function ClubBookDiscussions() {
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const location = useLocation();


  const [club, setClub] = useState(null)
  const [book, setBook] = useState(null)
  const [newDiscussionModalTrigger, setNewDiscussionModalTrigger] = useState(false)
  const [discussions, setDiscussions] = useState()


  //set club and book based on url:
  useEffect(() => {
    const array = location.pathname.split('/').filter(Boolean);
    setClub(array[1])
    setBook(array[2])
    console.log(array)

    getClubDiscussions(user, array[1].replace(/_/g, " "), array[2].replace(/_/g, " "), setDiscussions)

  }, [location])

  return (
      <main className="pageContainer">

        <Modal trigger={newDiscussionModalTrigger} setTrigger={setNewDiscussionModalTrigger}>
          {club && book && <NewDiscussion club={club.replace(/_/g, " ")} book={book.replace(/_/g, " ")} setTrigger={setNewDiscussionModalTrigger}></NewDiscussion>}
        </Modal>

        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/bookclubs">
            Book Clubs
          </Link>
          <Link underline="hover" color="inherit" to={"/bookclubs/"+club}>
            {club && club.replace(/_/g, " ") + "'s Books"}
          </Link>
          <Typography color="text.primary">{book && book.replace(/_/g, " ") + "'s Discussions"}</Typography>
        </Breadcrumbs>

        <div className='header'>
        <h3 className='headerTitle'>{book && book.replace(/_/g, " ")}'s Discussions</h3>

            {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
            <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => setNewDiscussionModalTrigger(true)} variant="contained">New Discussion</Button>
            </div>
        </div>

        <br />

        {discussions && discussions.map((discussion) => (
            <Link to={'/bookclubs/' + club + '/' + book + '/' + discussion.title.replace(/ /g,"_")}  key={''}>
            <div className='aBook'>
              <div className="bookInfo">
                <h3 className='bookTitle'>{ discussion.title }</h3>
              
                <p className='by' >{"Last Post: " +  new Date(discussion.latestActivity).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}) }</p>
                <p className='by' >{"Last Post By: " + discussion.lastPoster }</p>
                <p className='by' >{"Posts Today: " + discussion.postsToday }</p>
              </div>
              
              {/* <span onClick={() => {deleteBook(book)}}>delete</span> */}
              
            </div>
            </Link>
        ))}

        <br /> 
        </main>
      )
}
