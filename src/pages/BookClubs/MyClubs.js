import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Link, useLoaderData, useParams, useNavigate } from 'react-router-dom'
import { getClubs } from './BookClubApiCalls'
import Modal from '../../modal'
import NewClub from './Modals/NewClub'
import { useAuthContext } from '../Hooks/useAuthContext';


// const clubs = [
//     {
//         title: 'Eldridge St. Book Club',
//         members: 8,
//         currentBooks: ['Principles'],
//         lastPost: new Date("2021-03-25"),
//         postsToday: 8
//     },
//     {
//         title: 'Tarrytown Square Book Club',
//         members: 8,
//         currentBooks: ['The Subtle Art of Not Giving a Fuck'],
//         lastPost: new Date("2023-03-25"),
//         postsToday: 8
//     },
//     {
//         title: 'Con Edison Buddies',
//         members: 8,
//         currentBooks: ['Principles'],
//         lastPost: new Date("2022-03-25"),
//         postsToday: 8
//     },
// ]

export default function MyClubs() {
    const { user } = useAuthContext()

    const navigate = useNavigate()
    const [clubs, setClubs] = useState()
    const [modalTrigger, setModalTrigger] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
      getClubs(user, setError, setClubs)
    }, [])

    useEffect(() => {
      console.log(clubs)

    }, [clubs])
    
    

  return (
    <main className="pageContainer">

        <Modal trigger={modalTrigger} setTrigger={setModalTrigger}>
          <NewClub setTrigger={setModalTrigger}/>
        </Modal>

        <div className='header'>
        <h3 className='headerTitle'>My Book Clubs</h3>

            {/* <Link onClick={() => setNewBook(!newBook)}>[New Book]</Link> */}
            <div className='newBookButton'>
            {user && <Button className='newBookButton' onClick={() => setModalTrigger(true)} variant="contained">New Book Club</Button>}
            </div>
        </div>

        <br />

        {clubs && clubs.map((club) => (
            <Link to={'/bookclubs/' + club.clubName.replace(/ /g,"_")}  key={''}>
            <div className='aBook'>
              <div className="bookInfo">
                <h3 className='bookTitle'>{ club.clubName }</h3>
              
                <p className='by' >{"Last Post : " + club.lastPost }</p>
                <p className='by' >{"Book: " + club.currBookTitle }</p>
                <p className='by' >{"Members : " + club.numMembers }</p>
                <p className='by' >{"Posts Today : " + club.postsToday }</p>
              </div>
              
              {/* <span onClick={() => {deleteBook(book)}}>delete</span> */}
              
            </div>
            </Link>
        ))}

    </main>
  )
}
