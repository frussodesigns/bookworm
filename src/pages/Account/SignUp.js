import React, { useState } from 'react'
import { useSignup } from '../Hooks/useSignup'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pref, setPref] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div>
      <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
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
      
        <button disabled={isLoading}>Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
      
    </div>
  )
}