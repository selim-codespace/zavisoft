'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGetProductByIdQuery } from '@/store/api/platziApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { data: product, isLoading, error, refetch } = useGetProductByIdQuery(id as string, {
        skip: !id,
    });

    const [activeImage, setActiveImage] = useState<number>(0);

    if (isLoading) return <LoadingSpinner text="Loading product details..." />;
    if (error || !product) return <ErrorMessage onRetry={() => refetch()} title="Product not found" message="We couldn't load the details for this product." />;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        // Optional: add a toast notification here
    };

    const currentImageUrl = product.images?.[activeImage] || 'https://via.placeholder.com/600';

    return (
        <div className="px-4 md:px-12 lg:px-24 py-12 flex flex-col gap-12">
            {/* Breadcrumb / Back Navigation */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-[#232321] font-bold hover:text-blue-600 transition-colors w-fit"
            >
                <ChevronLeft className="w-5 h-5" />
                Back to drops
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Images */}
                <div className="flex flex-col gap-4">
                    <div className="bg-[#F4F4F4] rounded-[48px] overflow-hidden aspect-square relative flex items-center justify-center p-8">
                        <Image
                            src={currentImageUrl}
                            alt={product.title}
                            fill
                            className="object-cover mix-blend-multiply mix-blend-color-burn"
                            unoptimized
                        />
                    </div>

                    {/* Thumbnail Gallery (if more than 1 image) */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 transition-all ${activeImage === index ? 'border-4 border-[#232321] opacity-100' : 'border-2 border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={img} alt={`Thumbnail ${index}`} fill className="object-cover mix-blend-multiply" unoptimized />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col pt-4 lg:pt-12">
                    {/* Category Badge */}
                    <span className="bg-[#4A69E2] text-white px-4 py-1 rounded-full text-xs font-bold uppercase w-fit mb-6 tracking-wider">
                        {product.category?.name || 'Category'}
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-[#232321] mb-4 leading-tight">
                        {product.title}
                    </h1>

                    <p className="text-[#FFA52F] text-3xl font-bold mb-8 flex items-end">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}
                    </p>

                    <div className="prose prose-lg text-gray-600 mb-12 max-w-none">
                        <p className="leading-relaxed">{product.description}</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full sm:w-auto bg-[#232321] text-white px-10 py-5 rounded-2xl font-bold uppercase flex items-center justify-center gap-3 hover:bg-black transition-colors md:text-lg shadow-xl shadow-black/10 active:scale-[0.98]"
                    >
                        <ShoppingBag className="w-6 h-6" />
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}
