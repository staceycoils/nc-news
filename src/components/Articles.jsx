import { useState, useEffect } from 'react';
import ArticleListCard from './ArticleListCard';
import { fetchApi } from '../api';
import { useParams } from 'react-router-dom';

export default function Articles(props) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        fetchApi('articles')
            .then((apiArticles) => {
                setArticles(apiArticles.articles);
                setIsLoading(false)
      });
    }, []);
    
  if (isLoading) return <p>loading</p>
  return (
    <div className='Articles'>
        <ul>
            {articles.map(article=>{
                return (
                    <li key={article.article_id}>
                        <ArticleListCard card={article}/>
                    </li>
                )
            })}    
        </ul> 
    </div>
  )
}