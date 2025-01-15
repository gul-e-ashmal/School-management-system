import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const classWiseSubjectEntryAPI = createApi({
    reducerPath: 'classWiseSubjectEntryAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/setups/school` }),
    keepUnusedDataFor: 30,
    tagTypes: ["classWiseSubjectEntry"],
    endpoints: (builder) => ({
        getClassWiseSubjectEntry: builder.query({
            query: (param) => ({ url: `/class/subjectEntry` }),
            providesTags: ["classWiseSubjectEntry"]
        }),
        createClassWiseSubjectEntry: builder.mutation({
            query(body) {
                return {
                    url: `/class/subjectEntry/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["classWiseSubjectEntry"]
        }),
        updateClassWiseSubjectEntry: builder.mutation({
            query(body) {
                return {
                    url: `/class/subjectEntry/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["classWiseSubjectEntry"]
        }),
        deleteClassWiseSubjectEntry: builder.mutation({
            query(body) {
                return {
                    url: `/class/subjectEntry/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["classWiseSubjectEntry"]
        })
    }),

})

export const {
    useGetClassWiseSubjectEntryQuery, useCreateClassWiseSubjectEntryMutation, useDeleteClassWiseSubjectEntryMutation, useUpdateClassWiseSubjectEntryMutation
} = classWiseSubjectEntryAPI