import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Category {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: Category;
}

export const platziApi = createApi({
    reducerPath: 'platziApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakeapi.platzi.com/en/rest/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'products',
        }),
        getProductById: builder.query<Product, string | number>({
            query: (id) => `products/${id}`,
        }),
        getCategories: builder.query<Category[], void>({
            query: () => 'categories',
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetCategoriesQuery } = platziApi;
