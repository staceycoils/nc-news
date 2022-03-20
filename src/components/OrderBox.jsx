export default function OrderBox(props) {
    const { sort, changeOrder } = props

    const alphaBlock = (
        <select id='SortOptsAZSelect' className='Select' onChange={changeOrder}>
            <option value='asc'>A to Z</option>
            <option value='desc'>Z to A</option>
        </select>
    )

    const dateBlock = (
        <select id='SortOptsDateSelect' className='Select' onChange={changeOrder}>
            <option value='desc'>Newest First</option>
            <option value='asc'>Oldest First</option>
        </select>
    )

    const countBlock = (
        <select id='SortOptsNumSelect' className='Select' onChange={changeOrder}>
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
    if (sort === "votes") return (
        <div>{countBlock}</div>
    )
    else return null
}