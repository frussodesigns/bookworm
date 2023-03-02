import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NewDiscussionPopup from './Components/NewDiscussionPopup'
import { useAuthContext } from '../Hooks/useAuthContext'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from "react-router-dom"
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';

export default function DiscussionBook() {
  const { genre, book } = useParams()
  const [bookObj, setBook] = useState()
  const [genreObj, setGenre] = useState()
  const [topicsList, setTopics] = useState()
  const { user } = useAuthContext()
  
  let navigate = useNavigate()
  const [nav, setNav] = useState('')
  
  const [trigger, setTrigger] = useState()

  useEffect(() => {

    // console.log(book)

    //get book from id
    const fetchBook = async () => {
      const response = await fetch('/api/discuss/book/' + book)
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        setBook(json)
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    const fetchTopics = async () => {
      const response = await fetch('/api/discuss/topics/' + book)
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        for (let i = 0; i < json.length; i++){
          json[i].id = json[i]._id
        }
        setTopics(json)
        console.log(json)
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

    
    fetchBook()
    fetchTopics()
    fetchGenre()

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
       setTrigger(false)
     }
    }
    window.addEventListener('keydown', handleEsc)

  }, [])

  const columns = [
    { field: 'discussion', headerName: 'Discussion', minWidth: 150, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + book + "/" + params.row.id}>{params.row.title}</a>
    },
    { field: 'numPosts', headerName: 'Posts', minWidth: 90, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + book + "/" + params.row._id}>{params.row.numPosts}</a>
    },
    { field: 'postsThisWeek', headerName: 'Posts This Week', minWidth: 90, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + book + "/" + params.row._id}>{params.row.postsThisWeek}</a>
    },
    { field: 'latestPost', headerName: 'Latest Post', minWidth: 120, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + book + "/" + params.row._id}>{new Date(params.row.latestPost).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})}</a>
    }
  ]

  const handleRowClick = (params) => {
    function Navigate () {
      // let navigate = useNavigate()
      // Somewhere in your code, e.g. inside a handler:
      setNav("/discuss/" + genre + "/" + book + "/" + params.row._id)
      // console.log(nav)
      // navigate(url)
    }

    Navigate()
  }

  useEffect(() => {
    navigate(nav)  
  }, [nav])



  return (
    <div className='pageContainer'>
      <NewDiscussionPopup trigger={trigger} setTrigger={setTrigger} book={bookObj}/>
      
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/discuss">
          Genres
        </Link>
        <Link underline="hover" color="inherit" to={"/discuss/"+genre}>
          {genreObj && genreObj.genre}
        </Link>
        <Typography color="text.primary">{bookObj && bookObj.title}</Typography>
      </Breadcrumbs>
      <br />
      {/* {user&&
        <div>
        <Button variant="contained" onClick={() => setTrigger(true)}>
          New Discussion
        </Button>
        <br />
        </div>
      } */}
      <div className='grid' style={{ width: '100%', cursor: 'pointer', background: 'white' }}>
          {topicsList && <DataGrid
            autoHeight
            rows={topicsList}
            columns={columns}
            rowsPerPageOptions={[20,30,40]}
            pageSize={20}
            hideFooter={false}
            disableSelectionOnClick={true}
            onRowClick={handleRowClick}
            // checkboxSelection
          />}
      </div>

      {/* <h3>{bookObj && bookObj.title}</h3> */}
      {user&& !trigger && <div className="speedDial"><SpeedDial
        ariaLabel="SpeedDial basic example"
        // sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClick={() => setTrigger(!trigger)}
      >
        {/* {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))} */}
      </SpeedDial></div>}
      
    </div>
  )
}
