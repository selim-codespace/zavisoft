'use client';

import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Navbar() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="pt-8 px-4 md:px-12 lg:px-24 w-full">
            <nav className="bg-white rounded-3xl px-6 py-4 flex items-center justify-between shadow-sm text-black">
                {/* Left Nav */}
                <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
                    <Link href="/products" className="hover:text-blue-600 transition-colors">
                        New Drops 🔥
                    </Link>
                    <Link href="/products" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        Men
                        <span className="text-[10px]">▼</span>
                    </Link>
                    <Link href="/products" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        Women
                        <span className="text-[10px]">▼</span>
                    </Link>
                </div>

                {/* Center Logo */}
                <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                    <Link href="/" className="font-extrabold text-3xl tracking-tighter" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        KICKS
                    </Link>
                </div>

                {/* Right Nav */}
                <div className="flex items-center gap-6">
                    <button className="hover:opacity-70 transition-opacity">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="hover:opacity-70 transition-opacity hidden md:block">
                        <User className="w-5 h-5" />
                    </button>
                    <Link href="/cart" className="flex items-center justify-center bg-[#FFA52F] rounded-full w-8 h-8 font-bold text-sm hover:opacity-80 transition-opacity">
                        {cartCount}
                    </Link>
                </div>
            </nav>
        </div>
    );
}
