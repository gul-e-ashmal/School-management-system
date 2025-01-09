import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sectionSetupAPI = createApi({
    reducerPath: 'sectionSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/setups/school' }),
    keepUnusedDataFor: 30,
    tagTypes: ["section"],
    endpoints: (builder) => ({
        getSection: builder.query({
            query: (params) => ({
                url: "/section",
                params:{
                    keyword:params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["section"]
        }),
        getSectionDetail: builder.query({
            query: (param) => ({ url: `/section/${param.id}` }),
        }),
        createSection: builder.mutation({
            query(body) {
                return {
                    url: `/section/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["section"]
        }),
        updateSection: builder.mutation({
            query(body) {
                return {
                    url: `/section/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["section"]
        }),
        deleteSection: builder.mutation({
            query(body) {
                return {
                    url: `/section/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["section"]
        })
    }),

})

export const { useGetSectionQuery,useUpdateSectionMutation,useCreateSectionMutation,useDeleteSectionMutation } = sectionSetupAPI