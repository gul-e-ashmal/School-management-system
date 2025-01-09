import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentSetupAPI = createApi({
    reducerPath: 'studentSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/setups/school' }),
    keepUnusedDataFor: 30,
    tagTypes: ["student"],
    endpoints: (builder) => ({
        getStudent: builder.query({
            query: (params) => ({
                url: "/student",
                params:{
                    keyword:params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["student"]
        }),
        getStudentDetail: builder.query({
            query: (param) => ({ url: `/student/${param.id}` }),
        }),
        fetchStudentRollNo: builder.query({
            query: (param) => ({ url: `/student/rollNo` }),
        }),
        createStudent: builder.mutation({
            query(body) {
        
                return {
                    url: `/student/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["student"]
        }),
        updateStudent: builder.mutation({
            query(body) {
                return {
                    url: `/student/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["student"]
        }),
        deleteStudent: builder.mutation({
            query(body) {
                return {
                    url: `/student/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["student"]
        })
    }),

})

export const { useGetStudentQuery, useUpdateStudentMutation, useDeleteStudentMutation, useCreateStudentMutation 
    ,useFetchStudentRollNoQuery
} = studentSetupAPI