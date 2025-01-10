import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolFeeTransactionSetupAPI = createApi({
    reducerPath: 'schoolFeeTransactionSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/transactions' }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getSchoolFeeTransaction: builder.query({
            query: (params) => ({
                url: "/schoolFeeTransaction",
                params: params
            })
        }),
        createSchoolFeeTransaction: builder.mutation({
            query(body) {
                return {
                    url: `/schoolFeeTransaction/new`,
                    method: "POST",
                    body: body
                }
            }
        }),
        updateQuarter: builder.mutation({
            query(body) {
                return {
                    url: `/quarter/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["quarter"]
        }),
        deleteQuarter: builder.mutation({
            query(body) {
                return {
                    url: `/quarter/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["quarter"]
        })
    }),

})

export const { useCreateSchoolFeeTransactionMutation, useGetSchoolFeeTransactionQuery } = schoolFeeTransactionSetupAPI