export default function OrderBox(props) {
    const { sort, changeOrder } = props

    const alphaBlock = (
        <select id='SortOptsAZSelect' className='articles__select' onChange={changeOrder}>
            <option value={null}>Order by...</option>
            <option value='asc'>A to Z</option>
            <option value='desc'>Z to A</option>
        </select>
    )

    const dateBlock = (
        <select id='SortOptsDateSelect' className='articles__select' onChange={changeOrder}>
            <option value={null}>Order by...</option>
            <option value='desc'>Newest First</option>
            <option value='asc'>Oldest First</option>
        </select>
    )

    const countBlock = (
        <select id='SortOptsNumSelect' className='articles__select' onChange={changeOrder}>
            <option value={null}>Order by...</option>
            <option value='desc'>Highest to Lowest</option>
            <option value='asc'>Lowest to Highest</option>
        </select>
    )

    if (sort === "All") return null
    if (sort === "author" || sort === "title") return (
        <div>{alphaBlock}</div>
    )
    if (sort === "created_at") return (
        <div>{dateBlock}</div>
    )
    if (sort === "votes" || sort === "comment_count") return (
        <div>{countBlock}</div>
    )
    else return <div>Pie</div>
}
