import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div>
      <h1>Welcome to the Recipe Blog! </h1>
      <Link to='/signup'> Sign Up</Link>
      <br />
      <hr />
    </div>
  )
}
