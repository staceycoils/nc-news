import { Link } from "react-router-dom"

export default function ArticlePageSelect(props) {
    const { total, slug } = props
    let pages = []
    for (let i = 0 ; i < total ; i += 10) {
        pages.push(pages.length+1)
    }
    let pageHome = ""
    if (slug.search === "") pageHome = `${slug.search.slice(0,-1)}?p=`
    else pageHome = slug.search.slice(0,-1)
    let currentPage = 1
    if (slug.search !== "") currentPage = Number.parseInt(`${slug.search.slice(-1)}`)
    let prevPage = (currentPage === 1 ? 1 : currentPage - 1 )
    let nextPage = (currentPage <= pages.length-1 ? currentPage + 1 : currentPage )

  return (
    <div className="articles__options--pageselect">
        <Link key={`linkPrevPage`} to={`/articles${pageHome}${prevPage}`}>
        <button key={`selectPrevPage`}
        className="buttonpage">Prev</button>
        </Link>
            {pages.map((page)=>{
                if (page === currentPage) return (
                        <button key={`selectPage${page}`} disabled
                        className="buttonpage">{page}</button>
                ) 
                else return (
                    <Link key={`linkPage${page}`} to={`/articles${pageHome}${page}`}>
                        <button key={`selectPage${page}`}
                        className="buttonpage">{page}</button>
                    </Link>
                )
            })}
        <Link key={`linkNextPage`} to={`/articles${pageHome}${nextPage}`}>
        <button key={`selectNextPage`}
        className="buttonpage">Next</button>
        </Link>
    </div>
  )
}