import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='header'>
        <h1>
        <Link to="/">NC NEWS</Link>
        </h1>
        <h2>
            For a Daily Dose of 'News'
        </h2>
    </header>
  )
}
