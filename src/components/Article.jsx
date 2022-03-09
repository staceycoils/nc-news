import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchApi } from '../api';

export default function Article() {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const articleRequest = useParams().article_id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchApi(`articles/${articleRequest}`)
            .then((apiArticle) => {
                setArticle(apiArticle.article);
                setIsLoading(false)
      });
    }, []);

    function returnToParent(e) {
        e.preventDefault();
        navigate(-1)
    }

    if (isLoading) return <p>Loading.....</p>
  return (
    <main>
        <button 
            className='ButtonBack'
            onClick={returnToParent} >
            Back
        </button>
        <div className='ArticlePage'>
            <h3>{article.title}</h3>
            <span className='ArticleListGrid'>
                <p className='lhs'>By {article.author} <br />On {article.created_at.slice(0,10)}</p>
                <p className='rhs'>In {article.topic}</p>
            </span>
                <p className='ArticleBody'>{article.body}</p>
            <span className='ArticleListGrid'>
                <p className='lhs'>Votes: {article.votes}</p>
                <p className='rhs'>Comments({article.comment_count})</p>
            </span>
        </div>
        <div>
            {/* For comments to go in future */}
        </div>
    </main>
  )
}
