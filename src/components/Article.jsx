import { useParams, useNavigate } from 'react-router-dom'
import ArticleCard from './ArticleCard';
import CommentCard from './CommentCard';

export default function Article() {
    const articleRequest = useParams().article_id;
    const navigate = useNavigate();

    function returnToParent(e) {
        e.preventDefault();
        navigate(-1)
    }

  return (
    <main>
        <button 
            className='ButtonBack'
            onClick={returnToParent} >
            Back
        </button>
        <ArticleCard articleRequest={articleRequest}/>
        <CommentCard articleRequest={articleRequest}/>
    </main>
  )
}
