import React from 'react'
import { sendApi } from '../api';

export default function DeleteButton(props) {
    const {article, comment} = props

    function deleteAction() {
        if(
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
      <button onClick={()=>{deleteAction()}}>
          DELETE
      </button>
  )
}
