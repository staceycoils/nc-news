import React from 'react'
import { sendApi } from '../api';
import { useNavigate } from 'react-router-dom';

export default function DeleteButton(props) {
    const {article, comment} = props
    const navigate = useNavigate();

    function deleteAction() {
        if (!comment) {
            if(
                window.confirm(
                    "Delete this article?\nThis action cannot be undone."
                    )
            ) {
                sendApi('delete',`articles/${article}`)
                    .then(()=>{
                        window.alert("Your article has been removed.")
                        navigate('/articles')
                    })
                    .catch((err)=>{
                        alert(`${err}, please try again`)
                    })
            }
        } else if(
            window.confirm(
                "Delete this comment?\nThis action cannot be undone."
                )
        ) {
            sendApi('delete',`comments/${comment}`)
                .then(()=>{
                    window.alert("Your comment has been removed.")
                    window.location.reload()
                })
                .catch((err)=>{
                    alert(`${err}, please try again`)
                })
        }
    }


  return (
      <button onClick={()=>{deleteAction()}}
      className='buttondelete--comment'>
          DELETE
      </button>
  )
}
