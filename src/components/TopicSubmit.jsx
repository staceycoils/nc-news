import { useState } from 'react';
import { sendApi } from '../api';
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
            setError("Please complete topic details")
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

    const submitTitleClass = error ? "submittopic__titlebox--error" : "submittopic__titlebox"
    const submitTopicClass = error ? "submittopic__titlebox--error" : "submittopic__titlebox"

    if (isSending === "Done!") return <TopicSuccess topic={newTopic} description={newDescription}/>
    return (
        <div className='submittopic'>
            <h4 className='submittopic__title'>Submit a Topic</h4>
            <p className='submittopic__grid'>
                <input className={submitTitleClass}
                defaultValue={'Enter Topic Name'}
                onBlur={(event)=>{setTopicTitle(event.target.value)}}>
                </input>
            </p>
            <p className='submittopic__grid'>
                <input className={submitTopicClass}
                defaultValue={'Enter Topic Description'}
                onBlur={(event)=>{setTopicDescription(event.target.value)}}>
                </input>
            </p>
            {error}<br />
            <p className='submittopic__grid--center'>
            <button onClick={()=>{submitTopic()}}
                    disabled={disabled}
                    className='submittopic__button'
                    >Submit</button>
            <br />{isSending}
            </p>
        </div>
    )
}
