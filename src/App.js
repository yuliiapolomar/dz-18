import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import  { useGetAllPostsQuery } from './app/api/posts';
import { changePost, deletePost } from './app/api/postsSlice';

function App() {

const {posts} = useSelector(state => state.posts)
useGetAllPostsQuery()
const dispatch = useDispatch()

const [page, setPage] = useState('1')
const [userSortId, setUserSortId] = useState('all')

 const arrUserId = useMemo(() => new Set(posts.map(post => post.userId)), [posts])

 const onSelect = (e) => {
  setUserSortId(e.target.value)
 }

 const sortedList = useMemo(() => {
  if(userSortId === 'all') {
    return posts
  }
  return posts.filter(post => post.userId === +userSortId)
 }, [posts,userSortId])

 const paginationNumbers = useMemo(() => sortedList?.length > 20 ? Math.round(sortedList.length / 20) : 1, [sortedList])

 const filterPosts = useMemo(() => {
  const start = page - 1 
  const end = start + 20
  return sortedList.slice(start, end)
}, [page, sortedList])

  return(
   <div className='todos'>
    <div className='header'>
    <h1 className='title'>TODO LIST</h1>
      <select selected value={userSortId} onChange={onSelect}>
        <option selected value='all' >All</option>
          {
           [... arrUserId].map(id => <option key={id} value={id}> userId: {id}</option>)
          }
      </select>
    </div>
      {
        filterPosts?.map((post) => {
          return(
            <li key={post.id} className='list-item'>
                <div>
                    <input className="list-checkbox" type="checkbox"  onClick={() => {dispatch(changePost(post.id))}} />
                    <span className={post.completed ? 'done' : ''} >{post.title}</span>
                </div>
                <button className="list-button"  disabled={!post.completed} onClick={() => {dispatch(deletePost(post.id))}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMPgtqrh4PdWU9WxUtsmEvvoV7NhhJLvNTvA&usqp=CAU" width={15} alt="delete"/>
                </button>
            </li>
          )
        })
      }
      <div className='pagination'>
        {
          [...Array(paginationNumbers)].map((_, idx) => (
            <button key={idx} className={`pagination__button ${(page === idx + 1) && 'pagination__button--active'}`} onClick={() => setPage(idx + 1)}>
              <span>{idx + 1}</span>
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default App;

 