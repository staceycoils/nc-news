import { Link } from 'react-router-dom'
import { sendApi } from '../api'
import { useEffect } from 'react'
import { useState } from 'react'
import HomeArticle from './HomeArticle'
import HomeComment from './HomeComment'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [comment, setComment] = useState([])
  const [latest, setLatest] = useState([])

  useEffect(() => {
    sendApi('get', `articles?limit=none`)    
      .then((apiArticles)=>{
        apiArticles.articles.sort((a,b) => Number.parseInt(a.hotness) < Number.parseInt(b.hotness))
        setArticles(apiArticles.articles)
      })
  }, [])

  useEffect(() => {
    sendApi('get', `articles`)    
      .then((apiArticles)=>{
        setLatest(apiArticles.articles[0])
      })
  }, [])

  useEffect(() => {
    sendApi('get', `comments`)    
      .then((apiComments)=>{
        setComment(apiComments.comment)
      })
  }, [])

  const hotArticles = [
    articles[0],
    articles[1],
    articles[2],
  ]

  return (
    <div>
      <h2>Hottest Articles</h2>
          <HomeArticle article={hotArticles[0]} />
          <HomeArticle article={hotArticles[1]} />
          <HomeArticle article={hotArticles[2]} />
      <h2>Latest Article</h2>
          <HomeArticle article={latest} />
      <h2>Latest Comment</h2>
          <HomeComment comment={comment[0]} />
    </div>
  )
}
