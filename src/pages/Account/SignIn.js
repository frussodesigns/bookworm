import React, { useState } from 'react'
import { useSignin } from '../Hooks/useSignin'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signin, error, isLoading} = useSignin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signin(email, password)
  }

  return (
    <div>
      <form className='signin' onSubmit={handleSubmit}>
        <h3>Sign In</h3>
      <label>Email:</label>
        <input 
        className='ndField'
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email} 
        />
      <label>Password:</label>
        <input 
        className='ndField'
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password} 
        />
        <button disabled={isLoading}>Sign In</button>
        {error && <div className='error'>{error}</div>}
      </form>
      
    </div>
  )
}