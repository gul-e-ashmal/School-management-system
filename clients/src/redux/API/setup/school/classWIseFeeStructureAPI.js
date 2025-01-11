import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const classWiseFeeStructureSetupAPI = createApi({
    reducerPath: 'classWiseFeeStructureSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/setups/school` }),
    keepUnusedDataFor: 30,
    tagTypes: ["classWiseFeeStructure"],
    endpoints: (builder) => ({
        fetchFeeStructureForClass: builder.query({
            query: (params) => ({
                url: "/class/feeStructure/fee",
                params: { branch: params.branch, company: params.company, classes: params.classes }
            }),
        }),
        getClassWiseFeeStructure: builder.query({
            query: (param) => ({ url: `/class/feeStructure` }),
            providesTags: ["classWiseFeeStructure"]
        }),
        createClassWiseFeeStructure: builder.mutation({
            query(body) {
                return {
                    url: `/class/feeStructure/new`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["classWiseFeeStructure"]
        }),
        updateClassWiseFeeStructure: builder.mutation({
            query(body) {
                return {
                    url: `/class/feeStructure/${body._id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["classWiseFeeStructure"]
        }),
        deleteClassWiseFeeStructure: builder.mutation({
            query(body) {
                return {
                    url: `/class/feeStructure/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["classWiseFeeStructure"]
        })
    }),

})

export const { useLazyFetchFeeStructureForClassQuery, useGetClassWiseFeeStructureQuery, 
    useCreateClassWiseFeeStructureMutation ,useDeleteClassWiseFeeStructureMutation
    ,useUpdateClassWiseFeeStructureMutation
} = classWiseFeeStructureSetupAPI