import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const companySetupAPI = createApi({
    reducerPath: 'companySetupAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/setups/common` }),
    keepUnusedDataFor: 30,
    tagTypes: ["company"],
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: (params) => ({
                url: "/company",
                params:{
                    keyword:params?.keyword ? params?.keyword : ""
                }
            }),
            providesTags: ["company"]
        }),
        
    }),
})

export const { useGetCompanyQuery } = companySetupAPI