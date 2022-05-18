import { useState, useContext } from 'react';
import { sendApi } from '../api';
import { useNavigate } from 'react-router-dom';
import { useTopics } from './Topics';
import { UserContext } from '../contexts/UserContext';
import { ArticleSuccess } from './SubmitSuccess';

export default function ArticleSubmit() {
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [topics, setTopics] = useState([{ slug: 'Select Topic'}]);
    const [errorTitle, setErrorTitle] = useState(null);
    const [errorTopic, setErrorTopic] = useState(null);
    const [errorBody, setErrorBody] = useState(null);
    const [isSending, setIsSending] = useState("");
    const [setIsLoading] = useState("");
    const [disabled, setDisabled] = useState("");
    const [newArticle, setNewArticle] = useState("");
    const user = useContext(UserContext)
    const navigate = useNavigate()

    function changeTopic(e) {
        if (e.target.value === "Select Topic") return
        setTopic(e.target.value)
    }

    useTopics(setTopics,setIsLoading);

    function submitArticle() {
        let lockout = false
        if (title === "Enter title here" || (!title)) {
            setErrorTitle("Please enter a title")
            lockout = true
        } else setErrorTitle(null)
        if (topic === "" || (!topic)) {
            setErrorTopic("Please select a topic")
            lockout = true
        } else setErrorTopic(null)
        if (body === "Enter comment here" || (!body)) {
            setErrorBody("Please enter an article")
            lockout = true
        } else if (body.length <= 50) {
            setErrorBody("Articles must be 50 characters or longer")
            lockout = true
        } else setErrorBody(null)
        if (lockout) return
        else {
            setIsSending("Sending.....")
            setDisabled(true)
            sendApi('post', `articles`, {
                'author': `${user.user}`,
                'body': body,
                'title': title,
                'topic': 'cooking',
            })
            .then(({ article })=>{
                setNewArticle(article)
                setIsSending("Done!")
            })
        }
    }

    const submitTitleClass = errorTitle ? "submitarticle__titlebox--error" : "submitarticle__titlebox"
    const submitTopicClass = errorTopic ? "submitarticle__topicbox--error" : "submitarticle__topicbox"
    const submitBodyClass = errorBody ? "submitarticle__bodybox--error" : "submitarticle__bodybox"

    if (user.user === null) navigate("/")
    if (isSending === "Done!") return <ArticleSuccess article={newArticle} />
    return (
      <div className='submitarticle'>
          <h4 className='submitarticle__title'>Submit an Article</h4>
          <p className='submitarticle__grid'>
              Title:<br />
              <textarea className={submitTitleClass}
              defaultValue={'Enter title here'}
              onBlur={(event)=>{setTitle(event.target.value)}}>
              </textarea>
              <br />
              {errorTitle}
          </p>
          <p className='submitarticle__grid'>
              Topic:<br />
              <select id='TopicSelect' onChange={changeTopic}
              className={submitTopicClass}>
                <option key={'DefaultTopicOption'}>Select Topic</option>
                {topics.map(topic=>{
                    return (
                        <option key={`${topic.slug}TopicOption`}>
                            {topic.slug}
                        </option>
                    )
                })}
              </select>
              <br />
              {errorTopic}
          </p>
          <p className='submitarticle__grid'>
              Body:<br />
              <textarea className={submitBodyClass}
              defaultValue={'Enter text here'}
              onBlur={(event)=>{setBody(event.target.value)}}>
              </textarea>
              <br />
              {errorBody}
          </p>
          <p className='submitarticle__grid--center '>
              <button onClick={()=>{submitArticle()}}
                  disabled={disabled}
                  className='submitarticle__button'
                  >Submit</button>
                  <br />
            {isSending}
          </p>
      </div>
    )
}
