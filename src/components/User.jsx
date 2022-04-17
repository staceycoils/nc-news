import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { sendApi } from '../api'

export default function User() {
    const [user, setUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const userName = (useParams().username)

    useEffect(() => {
        sendApi('get', `users/${userName}`)    
          .then((apiUser)=>{
              setUser(apiUser.user)
              setIsLoading(false)
          })
      }, [])

    if (isLoading) return <p>Loading.....</p>
  return (
    <div className='ArticlePage'>
        <Link to='/users'>
            <button>Back</button>
        </Link>
        <p className='ArticleBody'>
        <img src={user.avatar_url} />
        <br />
        {user.username} 
        <br />
        {user.name} 
        </p>
    </div>
  )
}
