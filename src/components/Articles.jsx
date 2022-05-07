import { useState, useEffect, useContext } from 'react';
import ArticleListCard from './ArticleListCard';
import { fetchApi } from '../api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTopics } from './Topics';
import ArticlePageSelect from './ArticlePageSelect';
import SortBox from './SortBox';
import TopicSelectBox from './TopicSelectBox';
import OrderBox from './OrderBox';
import { UserContext } from '../contexts/UserContext';

export default function Articles(props) {
    const [articles, setArticles] = useState([]);
    const [list, setList] = useState(0);
    const [topics, setTopics] = useState([{ slug: 'All'}]);
    const [topic, setTopic] = useState("All");
    const [sort, setSort] = useState("All");
    const [order, setOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const slug = useLocation();
    const user = useContext(UserContext)
    const [limiter, setLimiter] = useState(0);

    useEffect(()=>{
        if (!user.user) setDisabled(true)
        else setDisabled(false)
    }, [user.user])
    
    useEffect(() => {
         fetchApi(`articles${slug.search}`)
            .then((apiArticles) => {
                setArticles(apiArticles.articles);
                setList(apiArticles.total_count)
                setIsLoading(false)
      });
    }, [slug]);

    useTopics(setTopics,setIsLoading);

    function changeTopic(e) {
        if (e.target.value === "Select Topic") return
        setTopic(e.target.value)
        changePage(e.target.value)
    }

    function changeSort(e) {
        if (e.target.value === "Sort by...") return
        setSort(e.target.value)
        if (e.target.value === "created_at" || e.target.value === "votes" || e.target.value === "comment_count") {
            changePage(undefined, e.target.value, "desc")
        } else changePage(undefined, e.target.value, "asc")
    }

    function changeOrder(e) {
        setOrder(e.target.value)
        changePage(undefined, undefined, e.target.value)
    }

    function changePage(t=topic,s=sort,o=order,p=1) {
        setIsLoading(true)
        if (t === "All" && s === "All") navigate(`/articles?p=${p}`)
        else if (t !== "All" && s === "All") navigate(`/articles?topic=${t}&p=${p}`)
        else if (t === "All" && s !== "All") navigate(`/articles?sort_by=${s}&order=${o}&p=${p}`)
        else navigate(`/articles?topic=${t}&sort_by=${s}&order=${o}&p=${p}`)
    }

  if (isLoading) return <p>Loading.....</p>
  return (
    <main className='articles__main'>
        <div className='articles__options'>
            <br />
            <TopicSelectBox topics={topics} changeTopic={changeTopic}/>
            <div className='articles__sorting'>
                <SortBox changeSort={changeSort}/>
                <OrderBox changeOrder={changeOrder} sort={sort}/>
            </div>
            <ArticlePageSelect total={list} slug={slug} />
        </div>
        <div className='articles__options'>
            <br />
            <Link to={`/articles/submit`}>
                <button disabled={disabled} className='articles__button'>Submit Article</button>
            </Link>
        </div>
        <ul className='articles__list'>
            {articles.length !== 0?
            articles.map(article=>{
                return (
                    <li key={article.article_id}
                    className='articles__listitem'>
                        <ArticleListCard card={article}/>
                    </li>
                )
            }):
            <p>No articles found.</p>
            }    
        </ul> 
        <div className='articles__options--end'>
            <br />
            <TopicSelectBox topics={topics} changeTopic={changeTopic}/>
            <div className='articles__sorting'>
                <SortBox changeSort={changeSort}/>
                <OrderBox changeOrder={changeOrder} sort={sort}/>
            </div>
            <ArticlePageSelect total={list} slug={slug} />
        </div>
    </main>
  )
}