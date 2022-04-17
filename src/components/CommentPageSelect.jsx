import React from 'react'
import { Link } from 'react-router-dom'

export default function CommentPageSelect(props) {
    const { page, setPage  } = props
    let commentTotal = 15
    let pages = []
    for (let i = 0; i < commentTotal; i+= 10) {
        pages.push(pages.length+1)
    }

    console.log(page)
  return (
    <div>
        <button key={`selectPrevPage`}
        onClick={()=>{setPage(page-1)}}
        >Prev</button>
            {/* {pages.map((commentPage)=>{
                if (page === commentPage) {
                    return (
                        <button key={`selectCommentPage${commentPage}`} 
                        disabled >{commentPage}</button>
                    )
                } else {
                    return (
                        <Link key={`linkCommentPage${commentPage}`} to={`/articles/34?p=${commentPage}`}>
                        <button key={`selectCommentPage${commentPage}`} 
                        >{commentPage}</button>
                        </Link>
                    )
                }
            })} */}
        <button key={`selectNextPage`}
        onClick={()=>{setPage(page+1)}}
        >Next</button>
    </div>
  )
}
