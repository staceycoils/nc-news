import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Logout() {
  const { user, setUser } = useContext(UserContext)

  function logoutUser(e) {
    setUser(null)
    window.alert("You have been logged out")
  }

  return (
    <button onClick={(e)=>{logoutUser(e)}}
    className='header__logout'>
        LOGOUT
    </button>
  )
}
