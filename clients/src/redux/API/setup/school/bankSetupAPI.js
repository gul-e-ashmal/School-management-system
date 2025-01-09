import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bankSetupAPI = createApi({
    reducerPath: 'bankSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/setups/school' }),
    keepUnusedDataFor: 30,
    tagTypes: ["bank"],
    endpoints: (builder) => ({
        getBank: builder.query({
            query: (params) => ({
                url: "/bank",
                params:{
                    keyword:params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["bank"]
        }),
        getBankDetail: builder.query({
            query: (param) => ({ url: `/bank/${param.id}` }),
        }),
        createBank: builder.mutation({
            query(body) {
                return {
                    url: `/bank/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["bank"]
        }),
        updateBank: builder.mutation({
            query(body) {
                return {
                    url: `/bank/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["bank"]
        }),
        deleteBank: builder.mutation({
            query(body) {
                return {
                    url: `/bank/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["bank"]
        })
    }),
})

export const { useGetBankQuery, useCreateBankMutation, useDeleteBankMutation, useUpdateBankMutation } = bankSetupAPI