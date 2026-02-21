import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/store/api/platziApi';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Use first image or a placeholder
    const imageUrl = product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image';
    const priceParsed = typeof product.price === 'number' ? product.price : parseFloat(product.price);

    return (
        <div className="flex flex-col group">
            <div className="bg-[#F4F4F4] rounded-[32px] p-0 relative overflow-hidden mb-4 aspect-square flex items-center justify-center">
                {/* NEW Badge */}
                <div className="absolute top-0 left-0 bg-[#4A69E2] text-white px-4 py-2 text-sm font-bold rounded-tl-[32px] rounded-br-[24px] z-10">
                    New
                </div>

                <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                    unoptimized // Using unoptimized for fake store URLs as they might fail Next.js optimization
                />
            </div>

            <h3 className="text-[#232321] font-bold text-lg leading-tight uppercase mb-4 line-clamp-2 min-h-[50px]">
                {product.title}
            </h3>

            <Link
                href={`/products/${product.id}`}
                className="w-full bg-[#232321] text-white text-sm font-bold py-4 rounded-xl flex items-center justify-center hover:bg-black transition-colors uppercase"
            >
                VIEW PRODUCT - <span className="text-[#FFA52F] ml-1">${priceParsed}</span>
            </Link>
        </div>
    );
}
