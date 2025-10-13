import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext'
import { User } from './User.jsx'

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)

    return (
      <div>
        <h1>Welcome to the Recipe Blog! </h1>
        <b>
          Logged in as: &nbsp;
          <b>
            <User id={sub} />
          </b>
          <br />
        </b>
        <br />

        <button onClick={() => setToken(null)}> Logout</button>
        <br />
        <br />
      </div>
    )
  }

  // Form page ================================================================
  return (
    <div>
      <h1>Welcome To The Recipe Blog! </h1>
      <Link to='/login'> Login Here </Link> |
      <Link to='/signup'> Sign Up Here</Link>
      <br />
      <br />
    </div>
  )
}
