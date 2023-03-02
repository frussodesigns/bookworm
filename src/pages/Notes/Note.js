import React from 'react'
import { useParams } from 'react-router-dom'

export default function Note() {
  const { id } = useParams()

  return (
    <div>Note</div>
  )
}
