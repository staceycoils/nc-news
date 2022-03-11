import { Link } from "react-router-dom"

export default function SubmitSuccess(props) {
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
