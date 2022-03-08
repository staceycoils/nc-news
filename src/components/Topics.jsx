import { useState, useEffect } from 'react';
import { fetchApi } from '../api';
import { Link } from 'react-router-dom'

export function useTopics(setTopics,setIsLoading) {
    useEffect(() => {
        fetchApi('topics')
            .then((apiTopics) => {
                setTopics(apiTopics.topics);
                setIsLoading(false)
      });
    }, []);
}

export function Topics() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useTopics(setTopics,setIsLoading);

    if (isLoading) return <p>Loading.....</p>
  return (
    <main className='Articles'>
        <ul>
            {topics.map(topic=>{
                return (
                    <li key={topic.slug} className='ArticleList'>
                        <h3>
                            <Link to={`/articles?topic=${topic.slug}`}>
                            {topic.slug}
                            </Link>
                        </h3>
                        <p>{topic.description}</p>
                    </li>
                )
            })}    
        </ul> 
    </main>
  )
}