import { useState, useEffect } from 'react';
import ArticleListCard from './ArticleListCard';
import { fetchApi } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTopics } from './Topics';

export default function Articles(props) {
    const [articles, setArticles] = useState([]);
    const [topics, setTopics] = useState([{ slug: 'All'}]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const slug = useLocation();
    
    useEffect(() => {
        fetchApi(`articles${slug.search}`)
            .then((apiArticles) => {
                setArticles(apiArticles.articles);
                setIsLoading(false)
      });
    }, [slug]);

    useTopics(setTopics,setIsLoading);

    function changeTopic(e) {
        if (e.target.value === 'Select Topic') return;
        setIsLoading(true);
        if (e.target.value === 'All') {
            navigate("/articles/")
        } else {
            navigate(`/articles?topic=${e.target.value}`)
        }
    }

  if (isLoading) return <p>Loading.....</p>
  return (
    <main className='Articles'>
        <select id='TopicSelect' onChange={changeTopic}>
            TOPICS
            <option key={'DefaultTopicOption'}>Select Topic</option>
            <option key={'AllTopicOption'}>All</option>
            {topics.map(topic=>{
                return (
                    <option key={`${topic.slug}TopicOption`}>
                        {topic.slug}
                    </option>
                )
            })}
        </select>
        <ul>
            {articles.map(article=>{
                return (
                    <li key={article.article_id}>
                        <ArticleListCard card={article}/>
                    </li>
                )
            })}    
        </ul> 
    </main>
  )
}