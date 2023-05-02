import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';


export default function Chip(props) {
  const [cursor, setCursor] = useState('chip')

  useEffect(() => {
    if (props.del == true) setCursor('chipPointer')

  }, [])

  const handleClick = () => {
    props.click(props.title)
  }
  
  
  return (
    <div onClick={() => handleClick()} className={cursor}>
      {/* <div className="innerChip"> */}
        <p className="chipTitle">{props.title}</p>
        {props.del && <CloseIcon className="x" />}
      {/* </div> */}
    </div>
  )
}
