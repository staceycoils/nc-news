import { Link } from "react-router-dom"

export function CommentSuccess(props) {
    const {comment, title} = props
    
  return (
    <div className='ArticlePage'>
        <h3>Your comment has been posted!</h3>
        <p className='lhs'>
            By {comment.author}<br />
            Replying to {title}<br />
            At {comment.created_at.slice(0,10)}
        </p>
        <p className='ArticleBody'>
            {comment.body}
        </p>
        <Link to={`/articles/${comment.article_id}`}>
            <button>Back to Article</button>
        </Link>
    </div>
  )
}

export function TopicSuccess(props) {
    const {topic, description} = props
    
  return (
    <div className='ArticlePage'>
        <h3>Your topic has been created!</h3>
        <p className='lhs'>
            {topic}<br />
        </p>
        <p className='ArticleBody'>
            {description}
        </p>
        <Link to={`/topics`}>
            <button>Back to Topic List</button>
        </Link>
    </div>
  )
}

export function ArticleSuccess(props) {
    const {title, author, topic, created_at, body} = props.article
    
  return (
    <div className='ArticlePage'>
        <h3>Your article has been created!</h3>
        <p className='lhs'>
            {title}<br />
            By: {author}<br />
            In: {topic}<br />
        </p>
        <p className='rhs'>
            Created at {created_at}
        </p>
        <p className='ArticleBody'>
            {body}
        </p>
        <Link to={`/articles`}>
            <button>Back to Article List</button>
        </Link>
    </div>
  )
}