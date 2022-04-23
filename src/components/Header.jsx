import React from 'react'
import { Link } from 'react-router-dom'
import ManageUser from './ManageUser'

export default function Header() {
  return (
    <header className='header'>
        <h1>
        <Link to="/">NC NEWS</Link>
        </h1>
        <h2>
            For a Daily Dose of 'News'
        </h2>
        <ManageUser />
        <Link to="/" >Home</Link>&nbsp;
        <Link to="/articles" >Articles</Link>&nbsp;
        <Link to="/topics" >Topics</Link>&nbsp;
        <Link to="/users" >Users</Link>
    </header>
  )
}
