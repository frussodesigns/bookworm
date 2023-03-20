import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

export default function NoteDeleteConfirm(props) {

    const handleConfirm = async (note) => {
        console.log("confirmed")
        props.deleteNote(note)
        props.setDeleteToggle(false)

        // e.preventDefault()

        // if (!user) {
        //   setError('You must be logged in')
        //   return
        // }
    }

  return (
    <div className="popup">
        <div className="popupInner">
            <CloseIcon className='closeButton' onClick={() => props.setDeleteToggle(false)} />

            <h3>Please Confirm</h3>
            <div>Are you sure you would like to delete this note? This cannot be undone.</div>
            {/* <div>Are you sure you would like to delete {props.deleteToggle.title} and all of its {props.deleteToggle.notes} notes?</div> */}
            <div className="twoButton">
                <Button onClick={() => handleConfirm(props.deleteToggle)} size="small" variant="contained">
                    Confirm
                </Button>
                <Button onClick={() => props.setDeleteToggle(false)} size="small" variant="contained">
                    Cancel
                </Button>
            </div>
        </div>
    </div>
  )
}
