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
    <div className='homebody'>
      <h2 className='homearticles__toptitle'>Current Top Articles</h2>
      <div className='homearticles__top'>
          <HomeArticle article={hotArticles[0]} />
      </div>
      <div className='homearticles'>
          <HomeArticle article={hotArticles[1]} />
      </div>
      <div className='homearticles'>
          <HomeArticle article={hotArticles[2]} />
      </div>
      <div className='homearticles__seperator'></div>
      <h2 className='homearticles__title'>Latest Article</h2>
      <h2 className='homearticles__title'>Latest Comment</h2>
      <div className='homearticles'>
          <HomeArticle article={latest} />
      </div>
      <div className='homearticles'>
          <HomeComment comment={comment[0]} />
      </div>
    </div>
  )
}
