import React from 'react'

export default function HomeArticle(props) {
    const { article } = props ? props : null

    if (!article) return <p>Loading...</p>
  return (
    <div className='ArticlePage'>
        <h3>{article.title}</h3>
        <p className='ArticleBody'>
            At: {`
                    ${article.created_at.slice(0,10)}
                    ${article.created_at.slice(11,16)}
                `}<br />
            Comments: {article.comment_count}<br />
            Votes: {article.votes}
        </p>
    </div>
  )
}
