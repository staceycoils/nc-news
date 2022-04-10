export default function TopicSelectBox(props) {
    const { changeTopic, topics } = props
  return (
    <select id='TopicSelect' onChange={changeTopic}>
            TOPICS
            <option key={'DefaultTopicOption'}>Select Topic</option>
            <option key={'AllTopicOption'}>All</option>
            {topics.map(topic=>{
                return (
                    <option key={`${topic.slug}TopicOption`}>
                        {topic.slug}
                    </option>
                )
            })}
    </select>
  )
}
