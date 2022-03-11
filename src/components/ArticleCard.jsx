import { useState, useEffect } from "react";
import { sendApi, fetchApi } from "../api";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
    const { articleRequest } = props
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVoteLoading, setIsVoteLoading] = useState(false);

    useEffect(() => {
        fetchApi(`articles/${articleRequest}`)
            .then((apiArticle) => {
                setArticle(apiArticle.article);
                setIsLoading(false)
      });
    }, []);

    function giveVote(num) {
        const voteChange = { incVotes: num };
        setIsVoteLoading(true)
        sendApi('patch',`articles/${articleRequest}`, voteChange)
            .then(()=>{
                return fetchApi(`articles/${articleRequest}`)
            })
            .then((newApiArticle)=>{
                setArticle(newApiArticle.article);
                setIsVoteLoading(false)
            })
    }

    if (isLoading) return <p>Loading.....</p>
    return (
        <div className='ArticlePage'>
            <h3>{article.title}</h3>
            <span className='ArticleListGrid'>
                <p className='lhs'>By {article.author} <br />On {article.created_at.slice(0,10)}</p>
                <p className='rhs'>In <Link to={`/articles?topic=${article.topic}`}>{article.topic}</Link></p>
            </span>
                <p className='ArticleBody'>{article.body}</p>
            <span className='ArticleListGrid'>
                <p className='lhs'>
                    Votes: {article.votes}
                    <button 
                        onClick={(event) => giveVote(1)}
                        className='voteButton'
                        disabled={isVoteLoading}
                        >^</button>
                    <button 
                        onClick={(event) => giveVote(-1)}
                        className='voteButton'
                        disabled={isVoteLoading}
                        >v</button>
                </p>
                <p className='rhs'>Comments({article.comment_count})</p>
            </span>
        </div>
  )
}
