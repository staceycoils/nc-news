import { useState, useEffect, useContext } from 'react'
import { fetchApi } from '../api';
import { Link, useParams, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import CommentPageSelect from './CommentPageSelect'
import CommentList from './CommentList';

export default function CommentCard(props) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const location = (useLocation().search.slice(3))
    const [page, setPage] = useState(location)
    const [refresh, setRefresh] = useState("")
    const {articleRequest} = props 
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
    }, [page, refresh]);

    if (isLoading) return <p>Loading.....</p>
    if (!comments) return (
        <div className='ArticlePage'>
            <Link to={`/articles/${articleRequest}/submit`}>
                <button disabled={disabled}>Add Comment</button>
            </Link>
            <p className='ArticleBody'>No comments for this article.</p>
        </div>
    )
  return ( 
    <div className='ArticlePage'>
    <CommentPageSelect page={page} setPage={setPage} articleRequest={articleRequest}/>
    <Link to={`/articles/${articleRequest}/submit`}>
        <button disabled={disabled}>Add Comment</button>
    </Link>
        {comments.map((comment)=>{
            return (
                <CommentList 
                key={`${articleRequest}Comment${comment.comment_id}`}
                comment={comment}
                setRefresh={setRefresh}
                />
            )
        })}
    </div>
  )
}
