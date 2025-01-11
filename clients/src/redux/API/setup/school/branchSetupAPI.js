import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const branchSetupAPI = createApi({
    reducerPath: 'branchSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/setups/common` }),
    keepUnusedDataFor: 30,
    tagTypes: ["branch"],
    endpoints: (builder) => ({
        getBranch: builder.query({
            query: (params) => ({
                url: "/branch",
                params:{
                    keyword:params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["branch"]
        }),
        getBranchDetail: builder.query({
            query: (param) => ({ url: `/branch/${param.id}` }),
        }),
        createBranch: builder.mutation({
            query(body) {
                return {
                    url: `/branch/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["branch"]
        }),
        updateBranch: builder.mutation({
            query(body) {
                return {
                    url: `/branch/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["branch"]
        }),
        deleteBranch: builder.mutation({
            query(body) {
                return {
                    url: `/branch/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["branch"]
        })        
    }),
})

export const { useGetBranchQuery ,useCreateBranchMutation,useDeleteBranchMutation,useUpdateBranchMutation} = branchSetupAPI