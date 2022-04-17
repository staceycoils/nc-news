import { useState, useEffect, useContext } from 'react'
import { fetchApi } from '../api';
import HiddenComment from './HiddenComment';
import { Link, useParams, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import DeleteButton from './DeleteButton';
import CommentPageSelect from './CommentPageSelect'

export default function CommentCard(props) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const location = (useLocation().search.slice(3))
    const [page, setPage] = useState(location)
    const article = useParams().article_id
    const {articleRequest, commentTotal} = props 
    const user = useContext(UserContext)

    if (!page) setPage(1);

    useEffect(()=>{
        if (!user.user) setDisabled(true)
        else setDisabled(false)
    }, [user.user])

    useEffect(() => {
        fetchApi(`articles/${articleRequest}/comments?p=${page}`)
            .then((apiComments) => {
                setComments(apiComments.comments);
                setIsLoading(false)
        });
    }, [page]);

    if (isLoading) return <p>Loading.....</p>
  return ( 
    <div className='ArticlePage'>
    <CommentPageSelect page={page} setPage={setPage} commentTotal={commentTotal}/>
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
                        <br/>
                        {user.user === comment.author ? 
                        <DeleteButton 
                        article={article} 
                        comment={comment.comment_id}/> : 
                        null}
                    </p>
                    <HiddenComment 
                    comment={comment}/>
                </span>
            )
        })}
    </div>
  )
}
