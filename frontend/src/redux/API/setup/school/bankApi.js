import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    keepUnusedDataFor: 30,
    tagTypes: ["bank"],
    endpoints: (builder) => ({
        getBank: builder.query({
            query: (params) => ({
                url: "/products",
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    "price[lte]": params?.max,
                    'price[gte]': params?.min,
                    category: params.category,
                    "ratings[gte]": params.ratings

                }
            }),
            providesTags:["bank"]
        }),
        createBank: builder.mutation({
            query(body) {
                return {
                    url: `/admin/products`,
                    method: "POST",
                    body: body.product
                }
            },
            invalidatesTags:["bank"]
        }),
       
        deleteBank: builder.mutation({
            query(body) {
                return {
                    url: `/admin/products/${body.id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags:["bank"]
        })
    }),

})

export const {  } = productApi