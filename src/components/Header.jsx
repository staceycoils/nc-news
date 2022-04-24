import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import Logout from './Logout'


export default function Header() {
  const { user } = useContext(UserContext)

  const logStatusButton =
    !user ?
    <div>
      Not logged in<br />
      <Link to={"/login"} >
      <button>
        LOGIN
      </button>
      </Link>
    </div>
    :
    <div>
      Logged in as: {user}<br />
      <Logout />
    </div>

  return (
    <header className='header'>
        <h1>
        <Link to="/">NC NEWS</Link>
        </h1>
        <h2>
            For a Daily Dose of 'News'
        </h2>
        {logStatusButton}<br />
        <Link to="/" >Home</Link>&nbsp;
        <Link to="/articles" >Articles</Link>&nbsp;
        <Link to="/topics" >Topics</Link>&nbsp;
        <Link to="/users" >Users</Link>
    </header>
  )
}
