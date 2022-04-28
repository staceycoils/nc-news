import { Link } from "react-router-dom"

export default function SortBox(props) {
    const { changeSort } = props
  return (
    <select id='SortSelect' className='Select' onChange={changeSort}>
        <option key={'DefaultSortOption'}>Sort by...</option>
        <option key={'SortOptionAll'} value="All">Default</option>
        <option key={'SortOptionAlphabetical'} value="title">Alphabetical</option>
        <option key={'SortOptionAuthor'} value ='author'>Author</option>
        <option key={'SortOptionDate'} value="created_at">Date Posted</option>
        <option key={'SortOptionVotes'} value="votes">Votes</option>
        <option key={'SortOptionComments'} value="comment_count">Comment Count</option>
    </select>
  )
}