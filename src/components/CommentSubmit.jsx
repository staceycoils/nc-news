import { useState, useEffect, useContext } from 'react';
import { fetchApi, sendApi } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { CommentSuccess } from './SubmitSuccess';
import { UserContext } from '../contexts/UserContext';
import { useMatch } from 'react-router-dom';

export default function CommentSubmit() {
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const [isSending, setIsSending] = useState("");
    const [disabled, setDisabled] = useState("");
    const [newComment, setNewComment] = useState("");
    const [title, setTitle] = useState("");
    const {article_id} = useParams()
    const user = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetchApi(`articles/${article_id}`)
            .then((apiArticle) => {
                setTitle(apiArticle.article.title);
      });
    }, []);

    function submitComment() {
        if (body === "Enter comment here" || (!body)) {
            setError("Please enter a comment")
        } else {
            setError(null)
            setIsSending("Sending.....")
            setDisabled(true)
            sendApi('post', `articles/${article_id}/comments`, {
                'username': `${user.user}`,
                'body': body,
            })
            .then((data)=>{
                setNewComment(data.comment)
                setIsSending("Done!")
            })
        }
    }

    const submitClass = error ? "submitcomment__submitbox--error" : "submitcomment__submitbox"

    if (user.user === null) navigate("/")
    if (isSending === "Done!") return <CommentSuccess comment={newComment} title={title}/>
  return (
    <div className='submitcomment'>
        <h4 className='submitcomment__title'>Submit a comment</h4>
        <p>
            Replying to: '{title}'<br />
            <textarea 
            type='text'
            className={submitClass} 
            defaultValue={'Enter comment here'}
            onBlur={(event)=>{setBody(event.target.value)}}>
            </textarea>
        </p>
        <p className='submitcomment__error'>
            {error}
        </p>
        <button onClick={()=>{submitComment()}}
                disabled={disabled}
                className='submitcomment__button'
                >Submit</button>
        <p>{isSending}</p>
    </div>
  )
}
