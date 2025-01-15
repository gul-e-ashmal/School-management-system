import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const subjectSetupAPI = createApi({
    reducerPath: 'subjectSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/setups/school` }),
    keepUnusedDataFor: 30,
    tagTypes: ["subject"],
    endpoints: (builder) => ({
        getSubject: builder.query({
            query: (params) => ({
                url: "/subject",
                params: {
                    keyword: params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["subject"]
        }),
        getSubjectDetail: builder.query({
            query: (param) => ({ url: `/subject/${param.id}` }),
        }),
        createSubject: builder.mutation({

            query(body) {
                console.log("body",body);
                return {
                    url: `/subject/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["subject"]
        }),
        updateSubject: builder.mutation({
            query(body) {
                return {
                    url: `/subject/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["subject"]
        }),
        deleteSubject: builder.mutation({
            query(body) {
                return {
                    url: `/subject/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["subject"]
        })
    }),
})

export const {useLazyGetSubjectQuery, useGetSubjectQuery, useCreateSubjectMutation, useUpdateSubjectMutation, useDeleteSubjectMutation } = subjectSetupAPI