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
    <div className='ArticleList'>
        <h4>
          <Link to={`/articles/${article_id}`} >
          {title}
          </Link>
        </h4>
        <span className='ArticleListGrid'>
            <p className='lhs'>
            Submitted By {author}<br />
            Topic: {topic}<br />
            Submitted {created_at.slice(0,10)}<br />
            </p>
            <p className='rhs'>
            Votes: {votes}<br />
            Comments: {comment_count}<br />
            </p>
        </span>
    </div>
  )
}
