'use client';

import { useState } from 'react';
import { useGetProductsQuery } from '@/store/api/platziApi';
import ProductCard from '@/components/product/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LIMIT = 12;

export default function ProductsPage() {
    const [page, setPage] = useState(1);
    const offset = (page - 1) * LIMIT;

    const { data: products, isLoading, error, refetch } = useGetProductsQuery({ offset, limit: LIMIT });

    // Note: The Platzi API doesn't return total count easily without fetching all products.
    // We'll implement a simple pagination that continues as long as we get products.
    const hasNextPage = products && products.length === LIMIT;

    const handleNext = () => {
        if (hasNextPage) setPage(p => p + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(p => p - 1);
    };

    return (
        <div className="px-4 md:px-12 lg:px-24 py-12 flex flex-col gap-12 min-h-screen">
            <div className="flex justify-between items-end">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#232321] uppercase">
                    All Products
                </h1>
                <p className="text-gray-500 font-medium">Page {page}</p>
            </div>

            {isLoading ? (
                <div className="flex-grow flex items-center justify-center">
                    <LoadingSpinner text="Fetching products..." />
                </div>
            ) : error ? (
                <ErrorMessage onRetry={refetch} />
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="flex items-center gap-2 px-6 py-3 bg-[#232321] text-white rounded-xl font-bold uppercase transition-all hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Prev
                        </button>

                        <div className="flex items-center gap-2">
                            {[...Array(page + 2)].map((_, i) => {
                                const pageNum = i + 1;
                                if (pageNum < page - 1 || pageNum > page + 1) return null;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum)}
                                        className={`w-12 h-12 rounded-xl font-bold transition-all ${page === pageNum ? 'bg-[#4A69E2] text-white' : 'bg-gray-100 text-[#232321] hover:bg-gray-200'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={!hasNextPage}
                            className="flex items-center gap-2 px-6 py-3 bg-[#232321] text-white rounded-xl font-bold uppercase transition-all hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
