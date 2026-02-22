'use client';

import Image from 'next/image';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/store/api/platziApi';
import ProductCard from '@/components/product/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const { data: products, isLoading: isProductsLoading, error: productsError, refetch: refetchProducts } = useGetProductsQuery();
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, refetch: refetchCategories } = useGetCategoriesQuery();

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden">

      {/* 1. Hero Section */}
      <section className="px-4 md:px-12 lg:px-24 mt-8">
        <div className="relative p-1.5 md:p-2 bg-[#4A69E2] rounded-[42px] md:rounded-[64px]">
          <div className="bg-[#B38B3F] rounded-[36px] md:rounded-[56px] overflow-hidden relative min-h-[500px] md:min-h-[700px] flex items-end p-6 md:p-16">
            {/* Vertical Text Badge */}
            <div className="absolute left-0 top-[15%] bg-[#232321] text-white py-4 px-3 rounded-r-xl z-20 flex items-center justify-center"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                Nike product of the year
              </span>
            </div>

            <div className="absolute inset-0 z-0">
              <Image
                src="/hero.jpg"
                alt="Nike Air Max Hero Background"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-start justify-between w-full z-10 gap-8 h-full">
              <div className="md:col-span-8 flex flex-col justify-end text-white relative">
                <h2 className="text-2xl md:text-7xl font-bold mb-2 md:mb-4 uppercase tracking-tight">
                  NIKE AIR MAX
                </h2>
                <p className="text-md font-medium max-w-[280px] md:max-w-sm mb-6 md:mb-10 opacity-90">
                  Nike introducing the new air max for everyone&apos;s comfort
                </p>
                <button className="bg-[#4A69E2] text-white px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold w-fit hover:bg-blue-600 transition-all uppercase text-sm md:text-base active:scale-95">
                  SHOP NOW
                </button>
              </div>

              <div className="flex flex-col justify-end gap-3 md:gap-4 items-end md:col-span-4 relative">
                <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-3xl border-2 md:border-4 border-white/50 overflow-hidden shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1608667508764-33cf0726b13a?auto=format&fit=crop&q=80&w=200" alt="Thumb 1" fill className="object-cover" />
                </div>
                <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-3xl border-2 md:border-4 border-white/50 overflow-hidden shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=200" alt="Thumb 2" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Products Section */}
      <section className="px-4 md:px-12 lg:px-24">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-7xl font-bold leading-none tracking-tighter capitalize text-[#232321]">
            Don't miss out<br /> new drops
          </h2>
          <button className="bg-[#4A69E2] text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors uppercase">
            Shop new drops
          </button>
        </div>

        {isProductsLoading ? (
          <LoadingSpinner text="Loading latest drops..." />
        ) : productsError ? (
          <ErrorMessage onRetry={refetchProducts} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Categories Section */}
      <section className="bg-[#232321] py-16 px-4 md:px-12 lg:px-24 rounded-t-[48px] -mb-24">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-6xl font-extrabold tracking-tighter text-white uppercase">CATEGORIES</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-white text-[#232321] flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isCategoriesLoading ? (
          <LoadingSpinner text="Loading categories..." />
        ) : categoriesError ? (
          <ErrorMessage onRetry={refetchCategories} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {categories?.slice(0, 2).map((category) => (
              <div key={category.id} className="bg-[#F4F4F4] rounded-[32px] overflow-hidden group aspect-[4/3] md:aspect-auto md:h-[500px] relative flex flex-col justify-end p-8">
                <div className="absolute inset-0 z-0 p-8 flex items-center justify-center">
                  <Image
                    src={category.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80'}
                    alt={category.name}
                    fill
                    className="object-contain p-16 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="relative z-10 flex justify-between items-end">
                  <h3 className="text-3xl font-extrabold uppercase text-[#232321] max-w-[200px] leading-none">
                    {category.name}
                  </h3>
                  <div className="w-12 h-12 bg-[#232321] rounded-xl flex items-center justify-center text-white shrink-0 group-hover:bg-black transition-colors">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Reviews Section */}
      <section className="px-4 md:px-12 lg:px-24 mt-36">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-6xl font-extrabold tracking-tighter text-[#232321] uppercase">REVIEWS</h2>
          <button className="bg-[#4A69E2] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors uppercase text-sm">
            SEE ALL
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-[32px] overflow-hidden flex flex-col">
              <div className="p-6 md:p-8 flex-grow flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl text-[#232321] mb-2">Good Quality</h3>
                    <p className="text-gray-500 text-sm mb-4">I highly recommend shopping from kicks</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className="text-[#FFA52F]">★</span>
                      ))}
                      <span className="font-bold ml-2 text-sm text-[#232321]">5.0</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <Image src={`https://i.pravatar.cc/100?img=${item + 10}`} alt="User" width={48} height={48} className="object-cover" />
                  </div>
                </div>
              </div>
              <div className="relative h-64 w-full">
                <Image src={`https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400&h=300`} alt="Review shoe" fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
