import React, {useEffect, useState} from 'react'
import { Button } from '@mui/material'
import { Link, useLoaderData, useParams, useNavigate, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { getClubBooks } from './BookClubApiCalls'
import NewBookSelector from '../Notes/NewBookSelector'
import Modal from '../../modal'
import NewBook from './Modals/NewBook'
import ClubSettings from './Modals/ClubSettings'
import NewMember from './Modals/NewMember'
import { useAuthContext } from '../Hooks/useAuthContext'

// Club:
// - Title
// - URL
// - Books
// - Members
// - Posts Today

const books = [
  {
    title: 'Principles',
    url: 'Principles',
    author: 'Ray Dalio',
    postsToday: 8,
    lastPost: new Date("2021-03-25")
  },
  {
    title: 'Economics',
    url: 'Economics',
    author: 'Ha-Joon Chang',
    postsToday: 0,
    lastPost: new Date("2021-03-20")
  },
  {
    title: 'Atomic Habits',
    url: 'Atomic_Habits',
    author: 'James Clear',
    postsToday: 0,
    lastPost: new Date("2021-03-15")
  },
]


export default function ClubBooks() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation();

  const [newBookModalTrigger, setNewBookModalTrigger] = useState(false)
  const [newMemberModalTrigger, setNewMemberModalTrigger] = useState(false)
  const [clubSettingsModalTrigger, setClubSettingsModalTrigger] = useState(false)
  const [clubName, setClubName] = useState(null)
  const [clubBooks, setClubBooks] = useState()
  const [newBookToggle, setNewBookToggle] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    getClubBooks(user, clubName, setClubBooks, setError)
  }, [clubName])
  
  //set clubName based on url:
  useEffect(() => {
    const array = location.pathname.split('/').filter(Boolean);
    console.log(array)
    setClubName(array[1])
  }, [])

  return (
    <main className="pageContainer">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/bookclubs">
          Book Clubs
        </Link>
        <Typography color="text.primary">{clubName && clubName.replace(/_/g, " ") + "'s Books"}</Typography>
      </Breadcrumbs>

      <Modal trigger={newBookModalTrigger} setTrigger={setNewBookModalTrigger}>
        {clubName && <NewBook clubName={clubName.replace(/_/g, " ")} />}
      </Modal>
      <Modal trigger={newMemberModalTrigger} setTrigger={setNewMemberModalTrigger}>
        {clubName &&  user && <NewMember club={clubName.replace(/_/g, " ")} user={user} trigger={setNewMemberModalTrigger} />}
      </Modal>
      <Modal trigger={clubSettingsModalTrigger} setTrigger={setClubSettingsModalTrigger}>
      {clubName && 
        <ClubSettings 
          trigger={setClubSettingsModalTrigger}
          user={user}
          clubName={clubName.replace(/_/g, " ")}
        />
      }
      </Modal>

        <div className='header'>
        <h3 className='headerTitle'>{clubName && clubName.replace(/_/g, " ") + "'s Current Books"}</h3>

            {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
            <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => setNewBookModalTrigger(true)} variant="contained">New Book</Button>
            <Button className='newBookButton' onClick={() => setNewMemberModalTrigger(true)} variant="contained">New Member</Button>
            <Button className='newBookButton' onClick={() => setClubSettingsModalTrigger(true)} variant="contained">Club Settings</Button>
            </div>
        </div>
            {newBookToggle && <NewBookSelector version={2}></NewBookSelector>}

        <br />

        {clubBooks && clubBooks.map((book) => (
            <Link to={'/bookclubs/' + clubName + '/' + book.title.replace(/ /g,"_")}  key={''}>
            <div className='aBook'>
              <div className="bookInfo">
                <h3 className='bookTitle'>{ book.title }</h3>
              
                <p className='by' >{"By " + book.author }</p>
                <p className='by' >{"Last Post : " + book.lastPost }</p>
                <p className='by' >{"Posts Today : " + book.numPostsToday }</p>
              </div>
              
              {/* <span onClick={() => {deleteBook(book)}}>delete</span> */}
              
            </div>
            </Link>
        ))}

    </main>
  )
}
