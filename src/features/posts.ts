/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

type PostsState = {
  posts: Post[],
  loading: boolean,
  error: boolean,
};

const initialPosts: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
