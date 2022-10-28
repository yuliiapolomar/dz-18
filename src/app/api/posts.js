import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: ' https://jsonplaceholder.typicode.com'}),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => 'todos',
            providesTags: result => ['Post']
        }) 
    })
})

export const {useGetAllPostsQuery} = postApi;

export default postApi;