import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/app/constants/httpServices'

const fetchPosts = createAsyncThunk('posts/fetchPosts', async (thunkAPI) => {
  try {
    const response = await api.get(`/posts`)
    return response.data
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId, thunkAPI) => {
    try {
      const response = await api.get(`/posts/${postId}`)
      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

const addPost = createAsyncThunk(
  'posts/addPost',
  async (postData, thunkAPI) => {
    try {
      const response = await api.post('/posts', postData)
      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post, thunkAPI) => {
    try {
      const response = await api.put(`/posts/${post.id}`, post)
      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, thunkAPI) => {
    try {
      await api.delete(`/posts/${postId}`)
      return postId
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export { fetchPosts, addPost, updatePost, deletePost, fetchPostById }
