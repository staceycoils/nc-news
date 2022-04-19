import { useState, useEffect, useContext } from "react";
import { sendApi, fetchApi } from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import DeleteButton from "./DeleteButton";

export default function ArticleCard(props) {
    const { articleRequest, setCommentTotal } = props
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
                setCommentTotal(article.comment_count);
                setIsLoading(false)
      });
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
        <div className='ArticlePage'>
            <h3>{article.title}</h3>
            <span className='ArticleListGrid'>
                <p className='lhs'>By {article.author} <br />On {article.created_at.slice(0,10)}</p>
                <p className='rhs'>In <Link to={`/articles?topic=${article.topic}`}>{article.topic}</Link>
                <br />{user.user === article.author ? 
                    <DeleteButton 
                    article={article.article_id} /> : 
                    null}
                </p>
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
