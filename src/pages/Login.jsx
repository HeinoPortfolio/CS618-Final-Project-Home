import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export function Login() {
  // Login states ============================================================
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const [, setToken] = useAuth()

  // Login mutation ===========================================================
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('Failed to login!'),
  })

  // Login function handler ===================================================
  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }
  // Login form =================================================================
  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome to the Login Page</h1>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={loginMutation.isPending ? 'Logging in...' : 'Click To Log In'}
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  )
}
