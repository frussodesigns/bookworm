import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NewDiscussionPopup from './Components/NewDiscussionPopup'
import { useAuthContext } from '../Hooks/useAuthContext'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button'

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';

export default function DiscussionGenre() {

  const { genre } = useParams()
  const [genreObj, setGenre] = useState()
  const [genreId, setGenreId] = useState()
  const [books, setBooks] = useState()
  const { user } = useAuthContext()
  let navigate = useNavigate()
  const [nav, setNav] = useState('')


  
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    //fetch genre title from url
    const fetchGenreName = async () => {
      const response = await fetch('/api/discuss/genre/' + genre)
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        setGenre(json)
        setGenreId(json._id)
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    fetchGenreName()

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
       setTrigger(false)
     }
    }
    window.addEventListener('keydown', handleEsc)

  }, [])

  useEffect (() => {

    if (genreId){
    //fetch top books
    const fetchBooks = async () => {
      const response = await fetch('/api/discuss/books/' + genreId)
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        for (let i = 0; i < json.length; i++){
          json[i].id = json[i]._id
        }
        setBooks(json)
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }

    fetchBooks()
  }


  }, [genreId])

  useEffect(() => {
    console.log(books)

  }, [books])
  

  const columns = [
    { field: 'title', headerName: 'Book', minWidth: 150, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + params.row.id}>{params.row.title}</a>
    },
    { field: 'author', headerName: 'Author', minWidth: 130, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + params.row.id}>{params.row.author}</a>
    },
    { field: 'publisher', headerName: 'Publisher', minWidth: 130, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + params.row.id}>{params.row.publisher}</a>
    },
    { field: 'publishedDate', headerName: 'Published', minWidth: 90, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + genre + "/" + params.row.id}>{params.row.publishedDate}</a>
    },
    {
      field: 'numDiscussions',
      headerName: 'Discussions',
      type: 'number',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => 
      <Link href={"/discuss/" + params.row.url}>{params.row.numDiscussions}</Link>
    }
  ]

  const handleRowClick = (params) => {
    function Navigate () {
      // let navigate = useNavigate()
      // Somewhere in your code, e.g. inside a handler:
      setNav("/discuss/" + genre + "/" + params.row.id)
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
      <NewDiscussionPopup trigger={trigger} setTrigger={setTrigger}/>
      

      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/discuss">
          Genres
        </Link>
        <Typography color="text.primary">{genreObj && genreObj.genre}</Typography>
      </Breadcrumbs>

      {/* {user&&
        <div>
          <Button variant="contained" onClick={() => setTrigger(true)}>
            New Discussion
          </Button>
        </div>      
      } */}
      <br />
      {/* <h3>{ genreObj && genreObj.genre }</h3> */}
      <div className='grid' style={{ width: '100%', cursor: 'pointer', background: 'white' }}>
          {books && <DataGrid
            autoHeight
            rows={books}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5]}
            hideFooter={false}
            disableSelectionOnClick={true}
            onRowClick={handleRowClick}
            // checkboxSelection
          />}
      </div>
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
