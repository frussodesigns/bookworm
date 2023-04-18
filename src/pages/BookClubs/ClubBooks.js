import React, {useEffect, useState} from 'react'
import { Button } from '@mui/material'
import { Link, useLoaderData, useParams, useNavigate, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'

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
  const navigate = useNavigate()
  const location = useLocation();

  const [clubName, setClubName] = useState(null)

    useEffect(() => {
        const array = location.pathname.split('/').filter(Boolean);
        console.log(array)
        setClubName(array[1])
    }, [location])

  return (
    <main className="pageContainer">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/bookclubs">
          Book Clubs
        </Link>
        <Typography color="text.primary">{clubName && clubName.replace(/_/g, " ") + "'s Books"}</Typography>
      </Breadcrumbs>

        <div className='header'>
        <h3 className='headerTitle'>{clubName && clubName.replace(/_/g, " ") + "'s Books"}</h3>

            {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
            <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => navigate('/bookclubs/' + clubName + '/' + 'newBook')} variant="contained">New Book</Button>
            </div>
        </div>

        <br />

        {books && books.map((book) => (
            <Link to={'/bookclubs/' + clubName + '/' + book.title.replace(/ /g,"_")}  key={''}>
            <div className='aBook'>
              <div className="bookInfo">
                <h3 className='bookTitle'>{ book.title }</h3>
              
                <p className='by' >{"By " + book.author }</p>
                <p className='by' >{"Last Post : " + book.lastPost }</p>
                <p className='by' >{"Posts Today : " + book.postsToday }</p>
              </div>
              
              {/* <span onClick={() => {deleteBook(book)}}>delete</span> */}
              
            </div>
            </Link>
        ))}

    </main>
  )
}
