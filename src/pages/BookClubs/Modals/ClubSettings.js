import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Chip from '../../../chip';
import { getClubSettings, modClub, removeMember } from '../BookClubApiCalls';
import Modal from '../../../modal';
import { ToastContainer, toast } from 'react-toastify';


export default function ClubSettings(props) {

    const [mode, setMode] = useState('new')
    const [info, setInfo] = useState({
        title: props.clubName,
        members: [],
        currentBooks: [],
        completedBooks: [],
    })
    const [delMemEmail, setDelMemEmail] = useState(false)

    useEffect(() => {
        console.log('uE')
      getClubSettings(props.user, props.clubName, setInfo)
    }, [])

    useEffect(() => {
      console.log(info)
    
    }, [info])
    
    

    const handleFocus = (event) => event.target.select()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submitted')
        modClub(props.user, props.clubName, info.title)
        props.trigger(false)

    }

    const confirmDelete = async () => {
        // console.log('confirm')
        // console.log(delMemEmail)
        // console.log(props.clubName)
        // console.log(props.user)

        const res = await removeMember(props.user, delMemEmail, props.clubName)
        if (await res) {
            setDelMemEmail(false)
            ConfirmationToast()
            props.trigger(false)
        }
    } 

    const ConfirmationToast = () => {
        toast.success(delMemEmail + ' removed Successfully', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      };

  return (
    <div>

        <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />

        <Modal trigger={delMemEmail} setTrigger={setDelMemEmail}>
            {/* <CloseIcon className='closeButton' onClick={() => props.setDeleteToggle(false)} /> */}

            <h3>Please Confirm</h3>
            <div>Are you sure you would like to remove {delMemEmail} ?</div>
            {/* <div>Are you sure you would like to delete {props.deleteToggle.title} and all of its {props.deleteToggle.notes} notes?</div> */}
            <div className="twoButton">
                <Button onClick={() => confirmDelete()} size="small" variant="contained">
                    Confirm
                </Button>
                <Button onClick={() => setDelMemEmail(false)} size="small" variant="contained">
                    Cancel
                </Button>
            </div>
        </Modal>

        <div className='header'>
        <h3 className='headerTitle'>Book Club Settings</h3>
        </div>
        
        <br/>

        <form className="add" onSubmit={handleSubmit}>
            {/* <h3>New Note:</h3> */}

            <label>Title:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setInfo(old => ({...old, title: e.target.value}))}
                onFocus={handleFocus}
                value={info.title} />
            </div>
            <label>Members:</label>
            <div className="list">
                {info.members && info.members.map((member) => (
                    <Chip del={true} title={member.email} click={()=>{setDelMemEmail(member.email)}} />
                ))}
            </div>
            <label>Books:</label>
            <div className="list">
                {info.currentBooks.map((book) => (
                        <Chip del={true} title={book.title} click={()=>{}} />
                    ))}
            </div>
            {/* <label>Completed Books:</label>
            <div className="list">
                <Chip del={true} title={'test'} click={()=>{}} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'Morgan-Stanley-Madison'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
                <Chip del={true} title={'test'} />
            </div> */}
            {/* <label>Chapter Name:</label>
                <input 
                className='ndField'
                type="text"
                onChange={(e) => setChapterTitle(e.target.value)}
                value={chapterTitle} />
            <label>Page Number:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="number"
                onChange={(e) => setPage(e.target.value)}
                value={page} />
            </div>
            <label>Remark:</label>
                <textarea 
                className='remark'
                type="textarea"
                onChange={(e) => setRemark(e.target.value)}
                value={remark} />
            <div className="publicFlex">
            <label>Public: </label>
                <input 
                className='bool' 
                type="checkbox"
                onChange={(e) => setPub(e.target.checked)}
                value={pub} />
            </div> */}
            <div className="saveButton">
            <Button className='saveButton2' type="submit" variant="contained">Save</Button>
            </div>
            {/* <button>Add Note</button> */}
            {/* {error && <div className="error">{error}</div>} */}
        </form>

        <br />

    </div>
  )
}
