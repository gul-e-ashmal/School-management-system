import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const classSetupAPI = createApi({
    reducerPath: 'classSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/setups/school' }),
    keepUnusedDataFor: 30,
    tagTypes: ["class"],
    endpoints: (builder) => ({
        getClass: builder.query({
            query: (params) => ({
                url: "/class",
                params:{
                    keyword:params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["class"]
        }),
        getClassDetail: builder.query({
            query: (param) => ({ url: `/class/${param.id}` }),
        }),
        createClass: builder.mutation({
            query(body) {
                return {
                    url: `/class/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["class"]
        }),
        updateClass: builder.mutation({
            query(body) {
                return {
                    url: `/class/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["class"]
        }),
        deleteClass: builder.mutation({
            query(body) {
                return {
                    url: `/class/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["class"]
        })
    }),

})

export const { useGetClassQuery,useUpdateClassMutation,useCreateClassMutation,useDeleteClassMutation } = classSetupAPI