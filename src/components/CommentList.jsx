import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import HiddenComment from './HiddenComment';
import DeleteButton from './DeleteButton';
import { UserContext } from '../contexts/UserContext';
import { sendApi } from '../api';

export default function CommentList(props) {
    const { comment, setRefresh } = props
    const [isVoteLoading, setIsVoteLoading] = useState(false);
    const article = useParams().article_id
    const user = useContext(UserContext)

    function giveVote(num) {
        comment.votes += num
        console.log(comment.votes)
        const voteChange = { incVotes: num };
        setIsVoteLoading(true)
        sendApi('patch',`comments/${comment.comment_id}`, voteChange)
            .then(()=>{
                setRefresh("") 
            })
            .then(()=>{
                setIsVoteLoading(false)
            })
            .catch((err)=>{
                article.votes -= num
                setIsVoteLoading(false)
                alert(`${err}, please try again`)
            })
    }

    (comment.votes >= 0) ? comment.hide = false : comment.hide = true
  return (
    <span key={comment.comment_id}>
        <p className='lhs'>
            {comment.author}<br />
            At {comment.created_at.slice(0,10)}
        </p>
        <p className='rhs'>
            Votes: {comment.votes}
            <br/>
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
        {user.user === comment.author ? 
            <DeleteButton 
            article={article} 
            comment={comment.comment_id}/> : 
            null}
        </p>
        <HiddenComment 
        comment={comment}/>
    </span>
  )
}

