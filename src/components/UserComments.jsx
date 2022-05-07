import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { sendApi } from '../api'
import { useContext } from 'react'
import { useState } from 'react'

export default function UserComments(props) {
    const { userName, user } = props
    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [articleList, setArticleList] = useState([])
    const [listLoading, setListLoading] = useState(true)
    let articleKey = {}



    useEffect(() => {
        sendApi('get', `users/${userName}/comments`)    
          .then((apiUserComments)=>{
              setComments(apiUserComments.comments)
              setCommentsLoading(false)
          })
      }, [])

    useEffect(() => {
        sendApi('get', `articles?limit=none`)    
          .then((apiArticles)=>{
              setArticleList(apiArticles.articles)
              setListLoading(false)
          })
      }, [])

      function getTitle(id) {
        if (articleList.length === 0) return null
        return articleList.filter((e,i,a)=>{
            return a[i].article_id === id
        })[0].title
      }

    const userComments =
    comments.length ?
    <ul className='userbox__list'>
      {comments.map((comment) => {
        return (
          <li key={`UserArt${comment.comment_id}`}
          className='userbox__listitem'>
            <Link to={`/articles/${comment.article_id}`} >
            {comment.body.slice(0,50)}...
            </Link><br />
            on&nbsp;
            <Link to={`/articles/${comment.article_id}`} >
            {getTitle(comment.article_id)}
            </Link> 
            <br />
            Votes: {comment.votes}
          </li>
        )
      })}
    </ul>:
    <p className='ArticleBody'>No comments for this user.</p>

    if (commentsLoading || listLoading) {
        return (
            <span>
                <h3>{user.username}'s Comments</h3>
                Loading...
            </span>
        )
    } else
  return (
    <div className='userbox__comments'>
        <h3>{user.username}'s Comments</h3>
        {userComments}
    </div>
  )
}
