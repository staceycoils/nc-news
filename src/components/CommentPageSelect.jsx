import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendApi } from '../api'

export default function CommentPageSelect(props) {
    const { page, setPage, articleRequest } = props
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        sendApi('get',`articles/${articleRequest}`)
            .then((apiArticle)=>{
                setTotal(apiArticle.article.comment_count)
            })
    }, [])

    const pages = Math.floor((total/10)+1)
    const pageArray = []
    
    function createPages() {
        for (let i = 1; i <= pages; i++) {
            pageArray.push(i)
        }
    }
    createPages()

  return (
    <div className='articlecomments__sorting'>
        <button key={`selectPrevPage`}
        onClick={()=>{setPage(page-1)}}
        disabled={page===1}
        className='buttonpage'
        >Prev</button>
        
        {pageArray.map((p)=>{
            return (
                <button key={`CommentPage${p}`}
                onClick={()=>{setPage(p)}}
                disabled={page===p}
                className='buttonpage'>
                    {p}
                </button>
            )
        })}

        <button key={`selectNextPage`}
        onClick={()=>{setPage(page+1)}}
        disabled={page===pages}
        className='buttonpage'
        >Next</button>
    </div>
  )
}
