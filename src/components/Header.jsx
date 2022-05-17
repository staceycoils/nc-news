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
    <div className='header__log'>
      <p className='header__logstatus'>
        Not logged in
      </p>
      <Link to={"/login"} >
      <button className='header__login'>
        LOGIN
      </button>
      </Link>
    </div>
    :
    <div className='header__log'>
      Logged in as: {user}<br />
      <Logout />
    </div>

    const pic = "https://pbs.twimg.com/profile_images/1333392601450426370/x_DT51WI_400x400.jpg"

  return (
    <header className='header'>
        <h1 className='header__title'>
        <Link to="/">
          <img src={`${pic}`} className='header__icon'
          alt='Logo of NorthCoders'/>
        </Link>
        </h1>
        <div className='header__subhead'>
            <h3 className='header__subhead--h3'>NorthCoders News</h3>
            <h5 className='header__subhead--h5'>For a Daily Dose of 'News'</h5>
        </div>
        <h3 className='header__main'>
          {date}<br/>{time}
        </h3>
        {logStatusButton}
        <p className='header__buttonholder'>
          <Link to="/" >
            <button className='header__button--lhs'>
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
        </p>
    </header>
  )
}
