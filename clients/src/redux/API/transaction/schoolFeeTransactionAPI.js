import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolFeeTransactionSetupAPI = createApi({
    reducerPath: 'schoolFeeTransactionSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/transactions` }),
    keepUnusedDataFor: 30,
    tagTypes: "schoolFeeTransaction",
    endpoints: (builder) => ({
        getSchoolFeeTransaction: builder.query({
            query: (params) => ({
                url: "/schoolFeeTransaction",
                params: params
            }),
            providesTags: [ "schoolFeeTransaction"]
        }),
        createSchoolFeeTransaction: builder.mutation({
            query(body) {
                return {
                    url: `/schoolFeeTransaction/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["schoolFeeTransaction"]
        }),
        updateSchoolFeeTransaction: builder.mutation({
            query(body) {
                return {
                    url: `/schoolfeetransaction/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["schoolFeeTransaction"]
        }),
        deleteSchoolFeeTransaction: builder.mutation({
            query(body) {
                return {
                    url: `/schoolfeetransaction/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["schoolFeeTransaction"]
        })
    }),

})

export const { useCreateSchoolFeeTransactionMutation, useGetSchoolFeeTransactionQuery
    , useDeleteSchoolFeeTransactionMutation, useUpdateSchoolFeeTransactionMutation
} = schoolFeeTransactionSetupAPI