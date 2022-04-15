import { useState } from 'react';
import { fetchApi, sendApi } from '../api';
import { TopicSuccess } from './SubmitSuccess';

export default function TopicSubmit() {
    const [topicTitle, setTopicTitle] = useState("");
    const [topicDescription, setTopicDescription] = useState("");
    const [error, setError] = useState("");
    const [newTopic, setNewTopic] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isSending, setIsSending] = useState("");
    const [disabled, setDisabled] = useState("");

    function submitTopic(x) {
        if ((topicTitle === "Enter Topic Name" || (!topicTitle)) ||
            (topicDescription === "Enter Topic Description" || (!topicDescription))) {
            setError("Please nyaa")
        } else {
            setError(null)
            setIsSending("Sending.....")
            setDisabled(true)
            sendApi('post', `topics`, {
                'slug': topicTitle,
                'description': topicDescription,
            })
            .then(({topic})=>{
                console.log(topic)
                setNewTopic(topic.slug)
                setNewDescription(topic.description)
                setIsSending("Done!")
            })
        }
    }

    if (isSending === "Done!") return <TopicSuccess topic={newTopic} description={newDescription}/>
    return (
        <div className='ArticlePage'>
            <h4>Submit a Topic</h4>
            <p>
                <input className='CommentInput'
                defaultValue={'Enter Topic Name'}
                onBlur={(event)=>{setTopicTitle(event.target.value)}}>
                </input>
                <input className='CommentInput'
                defaultValue={'Enter Topic Description'}
                onBlur={(event)=>{setTopicDescription(event.target.value)}}>
                </input>
            </p>
            {error}<br />
            <button onClick={()=>{submitTopic()}}
                    disabled={disabled}
                    >Submit</button>
            <p>{isSending}</p>
        </div>
    )
}
