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
                comment.votes -= num
                setIsVoteLoading(false)
                alert(`${err}, please try again`)
            })
    }

    (comment.votes >= 0) ? comment.hide = false : comment.hide = true

  return (
    <div key={comment.comment_id} className='articlecomments__comment'>
        <p>
            {comment.author}
        </p>
        <p className='articlecomments__comment--rhs'>
            {comment.created_at.slice(11,16)}&nbsp;
            {comment.created_at.slice(0,10)}
        </p>
            <HiddenComment 
            comment={comment}/>
        <br />
        <p className='articlecomments__comment--rhs'>
        {user.user === comment.author ? 
            <DeleteButton 
            article={article} 
            comment={comment.comment_id}/> : 
            null}
            Votes: {comment.votes}
        <button 
            onClick={(event) => giveVote(1)}
            disabled={isVoteLoading}
            >^</button>
        <button 
            onClick={(event) => giveVote(-1)}
            disabled={isVoteLoading}
            >v</button>
        </p>
    </div>
  )
}

