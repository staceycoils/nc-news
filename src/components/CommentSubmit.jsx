import { useState, useEffect } from 'react';
import { fetchApi, sendApi } from '../api';
import { useParams } from 'react-router-dom';
import SubmitSuccess from './SubmitSuccess';

export default function CommentSubmit() {
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const [isSending, setIsSending] = useState("");
    const [disabled, setDisabled] = useState("");
    const [newComment, setNewComment] = useState("");
    const [title, setTitle] = useState("");
    const {article_id} = useParams()

    useEffect(() => {
        fetchApi(`articles/${article_id}`)
            .then((apiArticle) => {
                setTitle(apiArticle.article.title);
      });
    }, []);

    function submitComment() {
        if (body === "Enter comment here" || (!body) ) {
            setError("Please submit a full comment")
        } else {
            setError("")
            setIsSending("Sending.....")
            setDisabled(true)
            sendApi('post', `articles/${article_id}/comments`, {
                'username': 'grumpy19',
                'body': body,
            })
            .then((data)=>{
                setNewComment(data.comment)
                setIsSending("Done!")
            })
        }
    }

    if (isSending === "Done!") return <SubmitSuccess comment={newComment} title={title}/>
  return (
    <div className='ArticlePage'>
        <h4>Submit a comment</h4>
        <p>
            Replying to: '{title}'<br />
            <input className='CommentInput' 
            defaultValue={'Enter comment here'}
            onBlur={(event)=>{setBody(event.target.value)}}>
            </input>
        </p>
        {error}<br />
        <button onClick={()=>{submitComment()}}
                disabled={disabled}
                >Submit</button>
        <p>{isSending}</p>
    </div>
  )
}
