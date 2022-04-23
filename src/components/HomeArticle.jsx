import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeArticle(props) {
    const { article } = props ? props : null

    if (!article) return <p>Loading...</p>
  return (
    <div className='ArticlePage'>
        <Link to={`articles/${article.article_id}`} >
            <h3>{article.title}</h3>
        </Link>
        <p className='ArticleBody'>
            By: &nbsp;
            <Link to={`/user/${article.author}`}>
              {article.author}
            </Link>&nbsp;
            At: {`
                    ${article.created_at.slice(0,10)}
                    ${article.created_at.slice(11,16)}
                `}<br />
            Comments: {article.comment_count}&nbsp;
            Votes: {article.votes}
        </p>
    </div>
  )
}
