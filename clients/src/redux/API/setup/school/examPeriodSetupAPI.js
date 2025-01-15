import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const examPeriodSetupAPI = createApi({
    reducerPath: 'examPeriodSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/setups/school` }),
    keepUnusedDataFor: 30,
    tagTypes: ["examPeriodSetup"],
    endpoints: (builder) => ({
        getExamPeriodSetup: builder.query({
            query: (param) => ({ url: `/examPeriod` }),
            providesTags: ["examPeriodSetup"]
        }),
        createExamPeriodSetup: builder.mutation({
            query(body) {
                return {
                    url: `/examPeriod/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["examPeriodSetup"]
        }),
        updateExamPeriodSetup: builder.mutation({
            query(body) {
                return {
                    url: `/examPeriod/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["examPeriodSetup"]
        }),
        deleteExamPeriodSetup: builder.mutation({
            query(body) {
                return {
                    url: `/examPeriod/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["examPeriodSetup"]
        })
    }),

})

export const {
    useGetExamPeriodSetupQuery, useCreateExamPeriodSetupMutation, useUpdateExamPeriodSetupMutation, useDeleteExamPeriodSetupMutation
} = examPeriodSetupAPI