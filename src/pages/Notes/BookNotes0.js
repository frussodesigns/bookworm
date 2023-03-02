import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'

export default function BookNotes() {
  const { id } = useParams()

  // const [notes, setNotes] = useState(null)

  const bookNotes = useLoaderData()

  // useEffect (() => {
  //   setNotes(bookNotes)
  // }, [])

  console.log(bookNotes)
  

  return (
    <div>
      {bookNotes && bookNotes.map((note) => (
        <Link to="/" key={note._id}>
          <p>{ note.remark }</p>
          {/* <p>{ note._id }</p> */}
        </Link>
      ))}

      {/* <p>{ notes }</p> */}
      
      {/* { id } */}
    </div>
  )
}

export const bookNotesLoader = async ({ params }) => {
  const { id } = params
  const uri = "/api/notes/"

  const response = await fetch(uri)
  const json = await response.json()

  // console.log(response)

  return json

}
