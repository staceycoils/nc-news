import { useParams, useNavigate } from 'react-router-dom'
import ArticleCard from './ArticleCard';

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
        <div>
            {/* For comments to go in future */}
        </div>
    </main>
  )
}
