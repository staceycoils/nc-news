import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div>
        Home<br />
        <Link to="/articles" >Articles</Link>
    </div>
  )
}
