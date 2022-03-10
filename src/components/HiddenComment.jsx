export default function HiddenComment(props) {
  const {comment} = props
  
  if (comment.hide) {
  return (
      <p className="ArticleBody">
        <b>This comment has been hidden due to low score.</b>
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