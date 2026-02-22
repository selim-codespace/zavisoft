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
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], { offset?: number; limit?: number } | void>({
            query: (params) => {
                if (!params) return 'products';
                const { offset, limit } = params;
                return `products?offset=${offset || 0}&limit=${limit || 10}`;
            },
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
