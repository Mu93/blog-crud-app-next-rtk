import { createSlice } from '@reduxjs/toolkit'
import {
  addPostReducer,
  deletePostReducer,
  fetchPostByIdReducer,
  fetchPostsReducer,
  updatePostReducer,
} from './postsExtraReducers'
import { getPostsFromLocalStorage } from '@/app/constants/handleStorage'

const postTest = [
    {
      userId: 1,
      id: 1,
      title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
  ]
// initialState
const initialState = {
  posts: getPostsFromLocalStorage() || postTest,
  singlePost: null,
  status: 'idle',
  error: null,
  pagination: {
    totalItems: 0,
    itemsPerPage: 10,
  },
}

// more slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadMore: (state) => {
      state.pagination.itemsPerPage += 10
    },
  },
  extraReducers: (builder) => {
    fetchPostsReducer(builder)
    fetchPostByIdReducer(builder)
    addPostReducer(builder)
    updatePostReducer(builder)
    deletePostReducer(builder)
  },
})

export const data = (state) => state.posts

// Export the async thunk for external use
export const { loadMore } = postsSlice.actions

// Export the reducer
export default postsSlice.reducer
