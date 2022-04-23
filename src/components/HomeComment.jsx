import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeArticle(props) {
    const { comment } = props ? props : null

    if (!comment) return <p>Loading...</p>
  return (
    <div className='ArticlePage'>
        <p className='ArticleBody'>
          <Link to={`/articles/${comment.article_id}`}>
            {comment.body}<br />
          </Link>
            By: &nbsp;
            <Link to={`/user/${comment.author}`}>
              {comment.author}
            </Link>&nbsp;
            At: {`
                    ${comment.created_at.slice(0,10)}
                    ${comment.created_at.slice(11,16)}
                `}<br />
            Votes: {comment.votes}
        </p>
    </div>
  )
}
