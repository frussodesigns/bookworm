import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { newClubMember } from '../BookClubApiCalls';
import { ToastContainer, toast } from 'react-toastify';


export default function NewMember(props) {

    const handleFocus = (event) => event.target.select()
    const [input, setInput] = useState('')
    const [response, setResponse] = useState(null)

    const handleSubmit = () => {
        console.log('fired')
        newClubMember(props.user, props.club, input, setResponse)
    }


    const ConfirmationToast = () => {
        toast.success('Successfully Added!', {
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
    
    const ErrorToast = () => {
    toast.error('User Not Found!', {
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
    
    const ErrorToast2 = () => {
    toast.error('User Alr In Club!', {
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
    
    useEffect(() => {
        console.log(response)
        if (!response) return
        else if (response.error == "Cannot read properties of null (reading '_id')"){
            ErrorToast()
        }
        else if (response.error == "member already exists"){
            ErrorToast2()
        }
        else if (response == 'ok') {
            ConfirmationToast()
            props.trigger(false)
        }
  

      }, [response])
    

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

        <div className='header'>
            <h3 className='headerTitle'>New Group Member</h3>
        </div>

        <br />

    <form className="add" onSubmit={handleSubmit}>
        <label>Username:</label>
            <div className="pgNumDiv">
                <input 
                className='ndField'
                type="text"
                onChange={e => setInput(e.target.value)}
                onFocus={handleFocus}
                value={input} 
                />
            </div>

            <Button onClick={() => handleSubmit()} size="small" variant="contained">
                Add
            </Button>
    </form>
    </div>
  )
}
