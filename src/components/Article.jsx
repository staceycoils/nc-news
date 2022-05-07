import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ArticleCard from './ArticleCard';
import CommentCard from './CommentCard';
import ErrorPage from './ErrorPage';

export default function Article() {
    const [commentTotal, setCommentTotal] = useState(0)
    const articleRequest = useParams().article_id;
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    function returnToParent(e) {
        e.preventDefault();
        navigate(-1)
    }


    if (error) return <ErrorPage error={error} type="article" />
  return (
    <main className='article__main'>
        <button 
            className='buttonback'
            onClick={returnToParent} >
            Back
        </button>
        <ArticleCard articleRequest={articleRequest} setError={setError}/>
        <CommentCard articleRequest={articleRequest} />
    </main>
  )
}
