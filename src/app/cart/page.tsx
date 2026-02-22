'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, incrementQuantity, decrementQuantity } from '@/store/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalAmount = cartItems.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
        return acc + price * item.quantity;
    }, 0);

    const taxAmount = 0;
    const deliveryAmount = 6.99;
    const finalTotal = totalAmount + taxAmount + deliveryAmount;

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-4 min-h-[60vh]">
                <h2 className="text-4xl font-extrabold text-[#232321] mb-4">Your Bag</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">Items in your bag not reserved - check out now to make them yours.</p>
                <Link
                    href="/"
                    className="bg-[#232321] text-white px-8 py-4 rounded-xl font-bold uppercase flex items-center gap-2 hover:bg-black transition-colors"
                >
                    START SHOPPING <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-12 lg:px-24 py-12 flex flex-col gap-10">
            {/* Saving to celebrate banner */}
            <div>
                <h1 className="text-3xl font-bold text-[#232321] mb-2">
                    Saving to celebrate
                </h1>
                <p className="text-[#232321] text-sm mb-1">
                    Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed.
                </p>
                <p className="text-[#232321] text-sm">
                    <Link href="#" className="underline font-medium hover:text-blue-600 transition-colors">Join us</Link> or <Link href="#" className="underline font-medium hover:text-blue-600 transition-colors">Sign-in</Link>
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                {/* Left: Bag Items */}
                <div className="flex-1 w-full flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 bg-white">
                        <h2 className="text-3xl font-bold text-[#232321] mb-2">Your Bag</h2>
                        <p className="text-gray-500 text-sm mb-8">Items in your bag not reserved- check out now to make them yours.</p>

                        <div className="flex flex-col gap-8">
                            {cartItems.map((item) => {
                                const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
                                return (
                                    <div key={item.id} className="flex flex-col sm:flex-row gap-6">
                                        <div className="w-full sm:w-48 aspect-square bg-[#F4F4F4] rounded-3xl relative overflow-hidden shrink-0 flex items-center justify-center">
                                            <Image
                                                src={item.images?.[0] || 'https://via.placeholder.com/300'}
                                                alt={item.title}
                                                fill
                                                className="object-cover mix-blend-multiply p-2 hover:scale-105 transition-transform"
                                                unoptimized
                                            />
                                        </div>

                                        <div className="flex flex-col flex-grow justify-between">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <Link href={`/products/${item.id}`} className="hover:text-blue-600 transition-colors">
                                                        <h3 className="text-xl font-bold uppercase text-[#232321] leading-tight mb-2">{item.title}</h3>
                                                    </Link>
                                                    <p className="text-gray-600 font-medium mb-1">Men&apos;s Road Running Shoes</p>
                                                    <p className="text-gray-600">Enamel Blue/ University White</p>

                                                    <div className="flex items-center gap-6 mt-6">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[#232321] font-semibold">Size 10</span>
                                                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[#232321] font-semibold">Quantity {item.quantity}</span>
                                                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-[#4A69E2] text-2xl font-bold shrink-0">${price.toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center gap-4 mt-6">
                                                <button className="text-[#232321] hover:text-gray-500 transition-colors">
                                                    <Heart className="w-6 h-6" fill="none" />
                                                </button>
                                                <button
                                                    onClick={() => dispatch(removeFromCart(item.id))}
                                                    className="text-[#232321] hover:text-red-500 transition-colors"
                                                >
                                                    {/* Custom delete icon matching figma */}
                                                    <div className="w-6 h-6 border border-current rounded flex items-center justify-center relative">
                                                        <span className="absolute top-0 right-1/2 translate-x-1/2 -mt-1 w-3 h-0.5 bg-current"></span>
                                                        <span className="text-xs font-bold -mt-0.5">X</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-bold text-[#232321] mb-2">Order Summary</h2>

                        <div className="flex flex-col gap-4 text-[#232321] font-medium text-lg">
                            <div className="flex justify-between">
                                <span>{cartItems.length} ITEM{cartItems.length > 1 ? 'S' : ''}</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>${deliveryAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sales Tax</span>
                                <span>-</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-2xl font-bold text-[#232321] mt-2 mb-4">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-[#232321] text-white py-5 rounded-lg font-bold uppercase tracking-widest hover:bg-black transition-colors focus:ring-4 focus:ring-gray-300">
                            CHECKOUT
                        </button>

                        <button className="text-left font-bold text-[#232321] underline hover:text-gray-600 transition-colors mt-2">
                            User a promo code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}
