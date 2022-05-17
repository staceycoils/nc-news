import React from 'react'
import { Link } from 'react-router-dom'

export default function ArticleListCard(props) {
    const {
        article_id,
        title,
        author,
        topic,
        created_at,
        votes,
        comment_count    
    } = props.card
  return (
    <div>
        <h4 className='articles__listtitle'>
          <Link to={`/articles/${article_id}`} >
          {title}
          </Link>
        </h4>
        <span className=''>
            <p className=''>
            Topic: <Link to={`/articles?topic=${topic}`}>{topic}</Link><br />
            Submitted {created_at.slice(0,10)} by&nbsp;
            <Link to={`/user/${author}`} >
            {author}
            </Link><br />
            </p>
            <p className=''>
            Votes: {votes}<br />
            Comments: {comment_count}<br />
            </p>
        </span>
    </div>
  )
}
