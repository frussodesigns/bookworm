import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NewDiscussionPopup from './Components/NewDiscussionPopup'
import { useAuthContext } from '../Hooks/useAuthContext'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate, Outlet } from "react-router-dom"
import Button from '@mui/material/Button'

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';


export default function Discussions() {

  const [nonFiction, setNonFiction] = useState([])
  const [fiction, setFiction] = useState([])
  const [nav, setNav] = useState('')
  const { user } = useAuthContext()
  let navigate = useNavigate()


  const [trigger, setTrigger] = useState(false) //new discussion popup

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(process.env.REACT_APP_API + 'api/discuss/genres')
      const json = await response.json()
      // console.log(json)
      
      if (response.ok) {
        console.log(json)
        for (let i = 0; i < json.length; i++){
          if (json[i].fiction == false) {
            json[i].id = json[i]._id
            json[i].onRowClick = "/discuss/" + json[i].url
            setNonFiction((arr) => [...arr, json[i]])
              }
          else{
            json[i].id = json[i]._id
            json[i].onRowClick = "/discuss/" + json[i].url
            setFiction((arr2) => [...arr2, json[i]])    
          }
        }
        // dispatch({type: "SET_BOOKS", payload: json})
      }
    }
    
    console.log(process.env.REACT_APP_API )
    fetchGenres()

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
       setTrigger(false)
     }
    }
    window.addEventListener('keydown', handleEsc)

  }, [])



  const columns = [
    { field: 'genre', minWidth: 200, headerName: 'Genre', flex: 1,
      renderCell: (params) => 
      <a href={"/discuss/" + params.row.url}>{params.row.genre}</a>
    },
    {
      field: 'numBooks',
      headerName: 'Books',
      type: 'number',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => 
      <Link href={"/discuss/" + params.row.url}>{params.row.numBooks}</Link>
    },
    {
      field: 'numDiscussions',
      headerName: 'Discussions',
      type: 'number',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => 
      <a href={"/discuss/" + params.row.url}>{params.row.numDiscussions}</a>
    }
  ]

  const handleRowClick = (params) => {
    function Navigate () {
      // let navigate = useNavigate()
      // Somewhere in your code, e.g. inside a handler:
      setNav("/discuss/" + params.row.url)
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
    <div>
      <NewDiscussionPopup trigger={trigger} setTrigger={setTrigger}/>
      

      {/* <p>My Discussions</p> */}
      {/* <h1>Genres</h1> */}
      {/* {user&&
        <div>
        <Button variant="contained" onClick={() => setTrigger(true)}>
          New Discussion
        </Button>
        <br />
        </div>
      } */}
        <h3>Fiction</h3>
        <div className='grid' style={{ width: '100%', cursor: 'pointer', background: 'white' }}>
          <DataGrid
          //   sx={{ borderRadius: '16px',
          //   backgroundColor: 'rgba(224, 183, 60, 0.55)'
          // }}
            autoHeight
            rows={fiction}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[5]}
            hideFooter={true}
            disableSelectionOnClick={true}
            onRowClick={handleRowClick}
            // checkboxSelection
          />
        </div>
          

        <h3>Non-Fiction</h3>
        <div className='grid' style={{ width: '100%', cursor: 'pointer', background: 'white' }}>
          <DataGrid
            autoHeight
            rows={nonFiction}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[5]}
            hideFooter={true}
            disableSelectionOnClick={true}
            onRowClick={handleRowClick}
            // checkboxSelection
          />
        </div>
        
    </div>
      {/* <Outlet /> */}
      {user&& !trigger && <div className="speedDial"> <SpeedDial
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
