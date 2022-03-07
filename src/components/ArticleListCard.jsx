import React from 'react'

export default function ArticleListCard(props) {
    const {
        title,
        author,
        topic,
        created_at,
        votes,
        comment_count    
    } = props.card
  return (
    <div className='ArticleList'>
        <h4>{title}<br /></h4>
        <p className='ArticleListGrid'>
            <p className='lhs'>
            Submitted By {author}<br />
            Topic: {topic}<br />
            Submitted {created_at.slice(0,10)}<br />
            </p>
            <p className='rhs'>
            Votes: {votes}<br />
            Comments: {comment_count}<br />
            </p>
        </p>
    </div>
  )
}
