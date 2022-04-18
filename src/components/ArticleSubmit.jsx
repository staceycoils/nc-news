import { useState, useEffect, useContext } from 'react';
import { fetchApi, sendApi } from '../api';
import { useParams } from 'react-router-dom';
import { CommentSuccess } from './SubmitSuccess';
import { useTopics } from './Topics';
import TopicSelectBox from './TopicSelectBox';
import { UserContext } from '../contexts/UserContext';
import { ArticleSuccess } from './SubmitSuccess';

export default function ArticleSubmit() {
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [topics, setTopics] = useState([{ slug: 'Select Topic'}]);
    const [error, setError] = useState("");
    const [isSending, setIsSending] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [disabled, setDisabled] = useState("");
    const [newArticle, setNewArticle] = useState("");
    const {article_id} = useParams()
    const user = useContext(UserContext)

    function changeTopic(e) {
        if (e.target.value === "Select Topic") return
        setTopic(e.target.value)
        console.log(e.target.value)
    }

    // useEffect(() => {
    //     fetchApi(`articles/${article_id}`)
    //         .then((apiArticle) => {
    //   });
    // }, []);

    useTopics(setTopics,setIsLoading);

    function submitArticle() {
        if (body === "Enter comment here" || (!body)) {
            setError("Please enter a comment")
        } else {
            setError(null)
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
    if (isSending === "Done!") return <ArticleSuccess article={newArticle} />
    return (
      <div className='ArticlePage'>
          <h4>Submit an Article</h4>
          <p className='lhs'>
              Title:<br />
              <input className='ArticleInput' 
              defaultValue={'Enter comment here'}
              onBlur={(event)=>{setTitle(event.target.value)}}>
              </input><br />
              {error}
          </p>
          <p className='lhs'>
              Topic:<br />
              <select id='TopicSelect' onChange={changeTopic}>
                <option key={'DefaultTopicOption'}>Select Topic</option>
                {topics.map(topic=>{
                    return (
                        <option key={`${topic.slug}TopicOption`}>
                            {topic.slug}
                        </option>
                    )
                })}
              </select>
          </p>
          <p className='lhs'>
              Body:<br />
              <textarea className='ArticleBodyInput' 
              defaultValue={'Enter comment here'}
              onBlur={(event)=>{setBody(event.target.value)}}>
              </textarea>
          </p>
          {error}<br />
          <button onClick={()=>{submitArticle()}}
                  disabled={disabled}
                  >Submit</button>
          <p>{isSending}</p>
      </div>
    )
}
