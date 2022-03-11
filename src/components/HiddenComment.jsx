import { useState } from "react"

export default function HiddenComment(props) {
  const [reveal, setReveal] = useState("")
  const {comment} = props
  
  if (comment.hide) {
  return (
      <p className="ArticleBody">
        <b>This comment has been hidden due to low score. </b> 
        <button onClick={()=>{setReveal(`${comment.body}`)}}>Show</button><br/>
        {reveal}
      </p>
  )
  
  } else {
    return (
      <p className="ArticleBody">
        {comment.body}
      </p>
    )
  }
}