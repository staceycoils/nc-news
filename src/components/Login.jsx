import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { sendApi } from '../api'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, setUser } = useContext(UserContext)
  const [ username, setUsername] = useState("")
  const [ userList, setUserList ] = useState([])
  const [ error, setError ] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate("/")
  }, [])
  

  useEffect(()=>{
    sendApi("get","/users")
        .then((apiUsers)=>{
            setUserList(apiUsers.usernames)
        })
  }, [])

  function loginUser(e) {
    const userCheck = (userList.filter((i)=>i === username))
    if (userCheck.length === 0) {
        setError("Please enter a valid username")
    } else {
        setUser(username)
        window.alert(`Welcome ${username}!\nYou have been logged in.`)
        navigate("/")
    }
  }

  return (
    <div className='ArticlePage'>
        <h3>User Login</h3>
        <h5>Please enter your username</h5>
        <p>
            {error}
        </p>
        <p>
            <input defaultValue={"Username"}
            onChange={(e)=>setUsername(e.target.value)}></input><br />
            <button onClick={(e)=>{loginUser(e)}}>
                LOGIN
            </button>
        </p>
    </div>
  )
}
