import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { sendApi } from '../api'
import UserArticles from './UserArticles'
import UserComments from './UserComments'
import ErrorPage from './ErrorPage'

export default function User() {
    const [error, setError] = useState(null)
    const [user, setUser] = useState("")
    const [userLoading, setUserLoading] = useState(true)
    const userName = (useParams().username)
    const navigate = useNavigate()

    useEffect(() => {
        sendApi('get', `users/${userName}`)    
          .then((apiUser)=>{
              setUser(apiUser.user)
              setUserLoading(false)
          })
          .catch((err)=>{
            setError({err})
          })
      }, [])

    if (error) return <ErrorPage error={error} type="user" />  
    if (userLoading) return <p>Loading.....</p>
  return (
    <div className='userbox'>
        <button className='buttonback'
        onClick={()=>navigate(-1)}>&lt; Back</button>
        <br />
        <span className='userbox__user'>
          <img src={user.avatar_url} className='userbox__avatar'/>
          <p className='userbox__userinfo'>
            <b>Username:</b><br />
            {user.username}<br /><br />
            <b>Alias:</b><br />
            {user.name}
          </p>
        </span>
        <UserArticles userName={userName} user={user}/>
        <UserComments userName={userName} user={user}/>
    </div>
  )
}
