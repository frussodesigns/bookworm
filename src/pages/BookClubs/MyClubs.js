import React from 'react'
import { Button } from '@mui/material'
import { Link, useLoaderData, useParams, useNavigate } from 'react-router-dom'

const clubs = [
    {
        title: 'Eldridge St. Book Club',
        members: 8,
        currentBooks: ['Principles'],
        lastPost: new Date("2021-03-25"),
        postsToday: 8
    },
    {
        title: 'Tarrytown Square Book Club',
        members: 8,
        currentBooks: ['The Subtle Art of Not Giving a Fuck'],
        lastPost: new Date("2023-03-25"),
        postsToday: 8
    },
    {
        title: 'Con Edison Buddies',
        members: 8,
        currentBooks: ['Principles'],
        lastPost: new Date("2022-03-25"),
        postsToday: 8
    },
]

export default function MyClubs() {
    const navigate = useNavigate()

  return (
    <main className="pageContainer">

        <div className='header'>
        <h3 className='headerTitle'>My Book Clubs</h3>

            {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
            <div className='newBookButton'>
            <Button className='newBookButton' onClick={() => navigate('new')} variant="contained">New Book Club</Button>
            </div>
        </div>

        <br />

        {clubs && clubs.map((club) => (
            <Link to={'/bookclubs/' + club.title.replace(/ /g,"_")}  key={''}>
            <div className='aBook'>
              <div className="bookInfo">
                <h3 className='bookTitle'>{ club.title }</h3>
              
                <p className='by' >{"Last Post : " + club.lastPost }</p>
                <p className='by' >{"Book: " + club.currentBooks[0] }</p>
                <p className='by' >{"Members : " + club.members }</p>
                <p className='by' >{"Posts Today : " + club.postsToday }</p>
              </div>
              
              {/* <span onClick={() => {deleteBook(book)}}>delete</span> */}
              
            </div>
            </Link>
        ))}

    </main>
  )
}
