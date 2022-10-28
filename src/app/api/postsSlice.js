import { createSlice} from "@reduxjs/toolkit";
import postApi from "./posts";

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        deletePost: (state, {payload}) => {
            state.posts = state.posts.filter((post) => post.id !== payload )
        },
        changePost: (state, {payload}) => {
            state.posts = state.posts.map(post => {
                if(post.id === payload) {
                    post.completed = !post.completed
                }
                return post
            })
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            postApi.endpoints.getAllPosts.matchFulfilled,
            (state, {payload}) => {
                state.posts = payload
            },
                       
        )
    }
})

export const {deletePost, changePost} = postSlice.actions

export default postSlice.reducer;