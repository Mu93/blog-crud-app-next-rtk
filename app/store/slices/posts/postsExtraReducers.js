import {
  fetchPosts,
  addPost,
  deletePost,
  updatePost,
  fetchPostById,
} from './postsAsyncThunks'
import { toast } from 'react-toastify'
import {
  addPostsToLocalStorage,
  removePostsFromLocalStorage,
} from '@/app/constants/handleStorage'

// fetchPosts
const fetchPostsReducer = (builder) => {
  builder
    .addCase(fetchPosts.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.status = 'succeeded'
      // newPosts
      const uniquePostIds = new Set(state.posts.map((post) => post.id))
      const newPosts = payload.filter((post) => !uniquePostIds.has(post.id))
      state.posts = [...state.posts, ...newPosts]

      // pagination
      state.pagination.totalItems = payload.length

      // LocalStorage
      addPostsToLocalStorage([...state.posts, ...newPosts])
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
}

const fetchPostByIdReducer = (builder) => {
  builder
    .addCase(fetchPostById.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchPostById.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.singlePost = action.payload
    })
    .addCase(fetchPostById.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
}

// addPost
const addPostReducer = (builder) => {
  builder.addCase(addPost.fulfilled, (state, { payload }) => {
    // state.posts = [payload, ...state.posts]
    addPostsToLocalStorage([
      { ...payload, id: Math.round(Math.random() * 1000) },
      ...state.posts,
    ])
    toast.success('Post Added successfully')
    window.location = '/'
  })
}

// deletePost
const deletePostReducer = (builder) => {
  builder.addCase(deletePost.fulfilled, (state, action) => {
    const postId = action.payload

    const posts = state.posts.filter((post) => post.id !== postId)
    state.posts = posts
    removePostsFromLocalStorage()
    addPostsToLocalStorage(posts)
    toast.success('Post deleted successfully')
  })
}

// updatePost
const updatePostReducer = (builder) => {
  builder.addCase(updatePost.fulfilled, (state, action) => {
    const updatedPost = action.payload
    const existingPostIndex = state.posts.findIndex(
      (post) => post.id === updatedPost.id,
    )
    if (existingPostIndex !== -1) {
      state.posts[existingPostIndex] = updatedPost
      addPostsToLocalStorage([...state.posts, updatedPost])
    }
    // window.location = '/'
  })
}
export {
  fetchPostsReducer,
  fetchPostByIdReducer,
  addPostReducer,
  updatePostReducer,
  deletePostReducer,
}
