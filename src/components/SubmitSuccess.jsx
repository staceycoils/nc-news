import { Link } from "react-router-dom"

export function CommentSuccess(props) {
    const {comment, title} = props
    
  return (
    <div className='success'>
        <h3>Your comment has been posted!</h3>
        <p>
            By {comment.author}<br />
            Replying to {title}<br />
            At {comment.created_at.slice(0,10)}
        </p>
        <p className="success__body">
            {comment.body}
        </p>
        <Link to={`/articles/${comment.article_id}`}>
            <button className="buttonback">Back to Article</button>
        </Link>
    </div>
  )
}

export function TopicSuccess(props) {
    const {topic, description} = props
    
  return (
    <div className='success'>
        <h3>Your topic has been created!</h3>
        <p>
            {topic}<br />
        </p>
        <p className="success__body">
            {description}
        </p>
        <Link to={`/topics`}>
            <button className="buttonback">Back to Topic List</button>
        </Link>
    </div>
  )
}

export function ArticleSuccess(props) {
    const {title, author, topic, created_at, body} = props.article
    
  return (
    <div className='success'>
        <h3>Your article has been created!</h3>
        <p>
            {title}<br />
            By: {author}<br />
            In: {topic}<br />
        </p>
        <p>
            Created at {created_at.slice(0,10)}
        </p>
        <p className="success__body">
            {body}
        </p>
        <Link to={`/articles`}>
            <button className="buttonback">Back to Article List</button>
        </Link>
    </div>
  )
}