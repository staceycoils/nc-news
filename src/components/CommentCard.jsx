import { useState, useEffect } from 'react'
import { fetchApi } from '../api';
import HiddenComment from './HiddenComment';
import { Link } from 'react-router-dom';

export default function CommentCard(props) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {articleRequest} = props 

    useEffect(() => {
        fetchApi(`articles/${articleRequest}/comments`)
            .then((apiComments) => {
                setComments(apiComments.comments);
                setIsLoading(false)
        });
    }, []);

  return ( 
    <div className='ArticlePage'>
    <Link to={`/articles/${articleRequest}/submit`}>
        <button>Add Comment</button>
    </Link>
        {comments.map((comment)=>{
            (comment.votes >= 0) ? comment.hide = false : comment.hide = true
            return (
                <span key={comment.comment_id}>
                    <p className='lhs'>
                        {comment.author}<br />
                        At {comment.created_at.slice(0,10)}
                    </p>
                    <p className='rhs'>
                        Votes: {comment.votes}
                    </p>
                    <HiddenComment 
                    comment={comment}/>
                </span>
            )
        })}
    </div>
  )
}
