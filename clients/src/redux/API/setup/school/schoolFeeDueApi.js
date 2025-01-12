import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const schoolFeeDueSetupAPI = createApi({
    reducerPath: 'schoolFeeDueSetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/transactions` }),
    keepUnusedDataFor: 30,
    tagTypes: ["schoolFeeDue"],
    endpoints: (builder) => ({
        getSchoolFeeDue: builder.query({
            query: (params) => ({
                url: "/schoolFeeDue",
                params:params
            })
        }),
        getSchoolFeeDueDetail: builder.query({
            query: (param) => ({ url: `/quarter/${param.id}` }),
        }),
        createSchoolFeeDue: builder.mutation({
            query(body) {
                return {
                    url: `/schoolFeeDue/new`,
                    method: "POST",
                    body: body
                }
            }
        }),
        updatePaidAmountSchoolFeeDue: builder.mutation({
            query(body) {
                return {
                    url: `/schoolFeeDue/updatePaidAmount`,
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

export const { useLazyGetSchoolFeeDueQuery, useCreateSchoolFeeDueMutation,useUpdatePaidAmountSchoolFeeDueMutation } = schoolFeeDueSetupAPI