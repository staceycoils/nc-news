import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { sendApi } from '../api'
import { useState } from 'react'

export default function UserArticles(props) {
    const { userName, user } = props
    const [articles, setArticles] = useState([])
    const [articlesLoading, setArticlesLoading] = useState(true)
    const [articleList, setArticleList] = useState([])

    useEffect(() => {
      sendApi('get', `users/${userName}/articles`)    
        .then((apiUserArticles)=>{
            setArticles(apiUserArticles.articles)
            setArticlesLoading(false)
        })
    }, [userName])    

    useEffect(() => {
        sendApi('get', `articles?limit=none`)    
          .then((apiArticles)=>{
              setArticleList(apiArticles.articles)
              setArticlesLoading(false)
          })
      }, [])

      function getComments(id) {
        if (articleList.length === 0) return null
        return articleList.filter((e,i,a)=>{
            return a[i].article_id === id
        })[0].comment_count
      }

    const userArticles = 
        articles.length ?
        <ul className='userbox__list'>
        {articles.map((article) => {
          return (
            <li key={`UserArt${article.article_id}`}
            className='userbox__listitem'>
              <Link to={`/articles/${article.article_id}`} >
              {article.title}<br />
              </Link> 
              At: {`
                ${article.created_at.slice(0,10)}
                ${article.created_at.slice(11,16)}
              `}
              <br />
              Votes: {article.votes}
              <br />
              Comments: {getComments(article.article_id)}
            </li>
          )
        })}
      </ul>:
        <p className='ArticleBody'>No articles for this user.</p>

  if (articlesLoading) {
        return (
            <span>
                <h3>{user.username}'s Articles</h3>
                Loading...
            </span>
        )
    } else
  return (
    <div className='userbox__articles'>
        <h3>{user.username}'s Articles</h3>
        {userArticles}
    </div>
  )
}
