import { useState } from 'react'
import { useEffect } from 'react'
import { sendApi } from '../api'
import { Link } from 'react-router-dom'

export default function Users() {
    const [users, setUsers] = useState({usernames: []})
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
      sendApi('get', 'users')    
        .then((apiUsers)=>{
            setUsers(apiUsers)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading.....</p>
  return (
    <div className='ArticlePage'>
        {users.usernames.map((user)=>{
            return (
                <p className='ArticleBody'
                key={`username${user}`}
                >
                    <Link to={`/user/${user}`}>{user}</Link>
                </p>
            )
        })}
    </div>
  )
}
