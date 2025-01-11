import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const feeStructureAPI = createApi({
    reducerPath: 'feeStructureAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/setups/school` }),
    keepUnusedDataFor: 30,
    tagTypes: ["feeStructure"],
    endpoints: (builder) => ({
        getFeeStructure: builder.query({
            query: (params) => ({
                url: "/feeStructure",
                params: {
                    keyword: params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["feeStructure"]
        }),
        fetchFeeStructure: builder.query({
            query: (param) => ({
                url: `/feeStructure/fetch`,
                params: param
            }),
        }),
        getFeeStructureDetail: builder.query({
            query: (param) => ({ url: `/feeStructure/${param.id}` }),
        }),
        createFeeStructure: builder.mutation({
            query(body) {
                return {
                    url: `/feeStructure/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["feeStructure"]
        }),
        updateFeeStructure: builder.mutation({
            query(body) {
                return {
                    url: `/feeStructure/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["feeStructure"]
        }),
        deleteFeeStructure: builder.mutation({
            query(body) {
                return {
                    url: `/feeStructure/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["feeStructure"]
        })
    }),

})

export const { useGetFeeStructureQuery, useUpdateFeeStructureMutation,
    useCreateFeeStructureMutation, useDeleteFeeStructureMutation ,
    useLazyFetchFeeStructureQuery
} = feeStructureAPI