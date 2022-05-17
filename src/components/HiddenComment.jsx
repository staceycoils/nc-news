import { useState } from "react"

export default function HiddenComment(props) {
  const [reveal, setReveal] = useState("")
  const {comment} = props
  
  if (comment.hide) {
  return (
      <p className="articlecomments__comment--body">
        <b>This comment has been hidden due to low score. </b> 
        <br />
        <button onClick={()=>{setReveal(`${comment.body}`)}}
        className="buttonhidden"
        >Show</button><br/>
        {reveal}
      </p>
  )
  
  } else {
    return (
      <p className="articlecomments__comment--body">
        {comment.body}
      </p>
    )
  }
}