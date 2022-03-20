import { useState, useEffect, useContext } from 'react'
import { fetchApi } from '../api';
import HiddenComment from './HiddenComment';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function CommentCard(props) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const {articleRequest} = props 
    const user = useContext(UserContext)

    useEffect(()=>{
        if (!user.user) setDisabled(true)
        else setDisabled(false)
    }, [user.user])

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
        <button disabled={disabled}>Add Comment</button>
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
