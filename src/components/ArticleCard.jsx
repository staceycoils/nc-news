import { useState, useEffect, useContext } from "react";
import { sendApi, fetchApi } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import DeleteButton from "./DeleteButton";

export default function ArticleCard(props) {
    const { articleRequest,setError } = props
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVoteLoading, setIsVoteLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const user = useContext(UserContext)

    useEffect(()=>{
        if (!user.user) setDisabled(true)
        else setDisabled(false)
    }, [user.user])

    useEffect(() => {
        fetchApi(`articles/${articleRequest}`)
            .then((apiArticle) => {
                setArticle(apiArticle.article);
                setIsLoading(false)
            
      })
            .catch((err)=>{
                setError({err})
            })
    }, []);

    function giveVote(num) {
        article.votes += num
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
            .catch((err)=>{
                article.votes -= num
                setIsVoteLoading(false)
                alert(`${err}, please try again`)
            })
    }
    
    if (isLoading) return <p>Loading.....</p>
    return (
        <div className="articlebody">
            <h3 className="articlebody__title">{article.title}</h3>
            <span className="articlebody__details">
                <p className="articlebody__details--lhs">
                    By&nbsp;
                    <Link to={`/user/${article.author}`} >{article.author} </Link><br />
                    On {article.created_at.slice(0,10)}</p>
                <p className="articlebody__details--rhs">
                    In <Link to={`/articles?topic=${article.topic}`}>{article.topic}</Link>
                <br />{user.user === article.author ? 
                    <DeleteButton 
                    article={article.article_id} /> : 
                    null}
                </p>
            </span>
                <p className='articlebody__textbody'>{article.body}</p>
            <span className="articlebody__details">
                <p className="articlebody__details--lhs">
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
                <p className="articlebody__details--rhs">Comments({article.comment_count})</p>
            </span>
        </div>
  )
}
