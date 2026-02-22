'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useGetProductByIdQuery, useGetProductsQuery } from '@/store/api/platziApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data: product, isLoading, error, refetch } = useGetProductByIdQuery(id as string, {
        skip: !id,
    });

    const { data: relatedProducts } = useGetProductsQuery();

    const relatedRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (relatedRef.current) {
            const { scrollLeft, clientWidth } = relatedRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            relatedRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState('42');

    if (isLoading) return <LoadingSpinner text="Loading product details..." />;
    if (error || !product) return <ErrorMessage onRetry={() => refetch()} title="Product not found" message="We couldn't load the details for this product." />;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const colors = ['#2A323D', '#7A8C7A'];
    const sizes = ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47'];

    // Extract images from the mock product or use placeholders
    const heroImage = product.images?.[0] || 'https://via.placeholder.com/600';
    const displayImages = [heroImage, heroImage, heroImage, heroImage]; // Using the same for grid to match the mockup

    return (
        <div className="flex flex-col gap-16 pb-20">
            <div className="px-4 md:px-12 lg:px-24 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left: Images Grid (Mobile First: Top to Bottom, Desktop: Grid) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#F4F4F4] rounded-[32px] overflow-hidden aspect-[4/5] relative w-full">
                        <Image src={displayImages[0]} alt={product.title} fill className="object-cover mix-blend-multiply" unoptimized />
                    </div>
                    <div className="hidden sm:block bg-[#F4F4F4] rounded-[32px] overflow-hidden aspect-[4/5] relative w-full">
                        <Image src={displayImages[1]} alt={product.title} fill className="object-cover mix-blend-multiply" unoptimized />
                    </div>
                    <div className="hidden sm:block bg-[#F4F4F4] rounded-[32px] overflow-hidden aspect-[4/5] relative w-full">
                        <Image src={displayImages[2]} alt={product.title} fill className="object-cover mix-blend-multiply" unoptimized />
                    </div>
                    <div className="hidden sm:block bg-[#F4F4F4] rounded-[32px] overflow-hidden aspect-[4/5] relative w-full">
                        <Image src={displayImages[3]} alt={product.title} fill className="object-cover mix-blend-multiply" unoptimized />
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="lg:col-span-5 flex flex-col pt-0 lg:pt-4">
                    <div className="bg-[#4A69E2] text-white px-4 py-1.5 rounded-lg text-sm font-semibold w-fit mb-4">
                        New Release
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#232321] mb-4 leading-tight">
                        {product.title}
                    </h1>

                    <p className="text-[#4A69E2] text-2xl font-bold mb-8">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}
                    </p>

                    <div className="mb-6">
                        <h3 className="text-[#232321] font-bold uppercase text-sm mb-3">Color</h3>
                        <div className="flex gap-3">
                            {colors.map((color, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedColor(idx)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${selectedColor === idx ? 'ring-2 ring-black ring-offset-2' : 'ring-1 ring-gray-300'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-[#232321] font-bold uppercase text-sm">Size</h3>
                            <button className="text-[#232321] text-xs font-bold underline uppercase">Size Chart</button>
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    disabled={size === '39' || size === '40'}
                                    className={`py-3 rounded-xl font-bold transition-all disabled:opacity-40 disabled:bg-[#E7E7E3] disabled:text-gray-400
                    ${selectedSize === size ? 'bg-[#232321] text-white' : 'bg-white text-[#232321] hover:border-gray-300 border border-transparent'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-10 w-full">
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={handleAddToCart}
                                className="flex-grow bg-[#232321] text-white py-4 rounded-xl font-bold uppercase hover:bg-black transition-colors"
                            >
                                ADD TO CART
                            </button>
                            <button className="w-14 h-14 bg-[#232321] text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors shrink-0">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>
                        <button className="w-full bg-[#4A69E2] text-white py-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors">
                            BUY IT NOW
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 text-[#232321]">
                        <h3 className="font-extrabold uppercase text-lg">ABOUT THE PRODUCT</h3>
                        {/* The fake API description might not match the specific text from Figma exactly, so we show the API description and append the extra points to match design. */}
                        <p className="text-gray-600">Shadow Navy / Army Green</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            This product is excluded from all promotional discounts and offers.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm mt-2">
                            <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
                            <li>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
                        </ul>
                        <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* You may also like Section */}
            <div className="px-4 md:px-12 lg:px-24 mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-[#232321]">You may also like</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-lg bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-lg bg-[#232321] text-white flex items-center justify-center hover:bg-black transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div
                    ref={relatedRef}
                    className="flex overflow-x-auto gap-6 no-scrollbar scroll-smooth pb-4"
                >
                    {relatedProducts?.slice(0, 8).map((rp) => (
                        <div key={rp.id} className="min-w-[280px] md:min-w-[calc(25%-18px)]">
                            <ProductCard product={rp} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
