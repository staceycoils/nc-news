import { Link } from 'react-router-dom'
import { sendApi } from '../api'
import { useEffect } from 'react'
import { useState } from 'react'
import HomeArticle from './HomeArticle'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [latest, setLatest] = useState([])

  useEffect(() => {
    sendApi('get', `articles?limit=none`)    
      .then((apiArticles)=>{
        apiArticles.articles.sort((a,b) => Number.parseInt(a.hotness) < Number.parseInt(b.hotness))
        setArticles(apiArticles.articles)
      })
  }, [])

  const hotArticles = [
    articles[0],
    articles[1],
    articles[2],
  ]

  return (
    <div>
        Home<br />
        <Link to="/articles" >Articles</Link><br />
        <Link to="/topics" >Topics</Link><br />
        <Link to="/users" >Users</Link><br />
        <span>
          <HomeArticle article={articles[0]} />
          <HomeArticle article={articles[1]} />
          <HomeArticle article={articles[2]} />
        </span>
    </div>
  )
}
