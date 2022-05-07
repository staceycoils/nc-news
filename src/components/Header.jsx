import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import Logout from './Logout'


export default function Header() {
  const { user } = useContext(UserContext)
  let today = new Date();
  let date = today.toLocaleDateString()
  let time = today.toLocaleTimeString().slice(0,5)

  const logStatusButton =
    !user ?
    <div className='header__main'>
      Not logged in<br />
      <Link to={"/login"} >
      <button>
        LOGIN
      </button>
      </Link>
    </div>
    :
    <div className='header__main'>
      Logged in as: {user}<br />
      <Logout />
    </div>

    const pic = "https://pbs.twimg.com/profile_images/1333392601450426370/x_DT51WI_400x400.jpg"

  return (
    <header className='header'>
        <h1 className='header__title'>
        <Link to="/">
          <img src={`${pic}`} className=''
          height="100%" width="100%"/>
        </Link>
        </h1>
        <h2 className='header__subhead'>
            For a Daily Dose of 'News'
        </h2>
        <h3 className='header__main'>
          {date}&nbsp;{time}
        </h3>
        {logStatusButton}
        <Link to="/" >
          <button className='header__button'>
            Home
          </button>
        </Link>
        <Link to="/articles" >
          <button className='header__button'>
            Articles
          </button>
        </Link>
        <Link to="/topics" >
          <button className='header__button'>
            Topics
          </button>
        </Link>
        <Link to="/users" >
          <button className='header__button'>
            Users
          </button>
        </Link>
    </header>
  )
}
