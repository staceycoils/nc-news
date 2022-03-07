import { useState, useEffect } from 'react';
import ArticleListCard from './ArticleListCard';
import { fetchArticles } from '../api';

export default function Articles(props) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArticles()
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