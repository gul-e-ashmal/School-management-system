import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quarterSetupAPI = createApi({
    reducerPath: 'quarterSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/setups/school' }),
    keepUnusedDataFor: 30,
    tagTypes: ["quarter"],
    endpoints: (builder) => ({
        getQuarter: builder.query({
            query: (params) => ({
                url: "/quarter",
                params:{
                    keyword:params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["quarter"]
        }),
        getQuarterDetail: builder.query({
            query: (param) => ({ url: `/quarter/${param.id}` }),
        }),
        createQuarter: builder.mutation({
            query(body) {
                return {
                    url: `/quarter/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["quarter"]
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

export const { useGetQuarterQuery, useUpdateQuarterMutation, useCreateQuarterMutation, useDeleteQuarterMutation } = quarterSetupAPI