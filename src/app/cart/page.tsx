'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, incrementQuantity, decrementQuantity } from '@/store/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalAmount = cartItems.reduce((acc, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
        return acc + price * item.quantity;
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-4 min-h-[60vh]">
                <div className="bg-gray-100 p-8 rounded-full mb-8">
                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                </div>
                <h2 className="text-4xl font-extrabold text-[#232321] mb-4 uppercase">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven&apos;t added any fresh drops to your cart yet.</p>
                <Link
                    href="/"
                    className="bg-[#4A69E2] text-white px-8 py-4 rounded-xl font-bold uppercase flex items-center gap-2 hover:bg-blue-600 transition-colors"
                >
                    START SHOPPING <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-12 lg:px-24 py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-[#232321] mb-12 tracking-tighter">
                YOUR CART
            </h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-1 flex flex-col gap-6">
                    {cartItems.map((item) => {
                        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
                        return (
                            <div key={item.id} className="bg-white rounded-[32px] p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                                <div className="w-full sm:w-32 md:w-40 aspect-square bg-[#F4F4F4] rounded-2xl relative overflow-hidden shrink-0 flex items-center justify-center p-2">
                                    <Image
                                        src={item.images?.[0] || 'https://via.placeholder.com/300'}
                                        alt={item.title}
                                        fill
                                        className="object-cover mix-blend-multiply"
                                        unoptimized
                                    />
                                </div>

                                <div className="flex flex-col flex-grow justify-between w-full">
                                    <div className="flex justify-between items-start gap-4 mb-4">
                                        <div>
                                            <Link href={`/products/${item.id}`} className="hover:text-blue-600 transition-colors">
                                                <h3 className="text-xl font-bold uppercase text-[#232321] leading-tight line-clamp-2">{item.title}</h3>
                                            </Link>
                                            <p className="text-gray-500 text-sm mt-1">{item.category?.name}</p>
                                        </div>
                                        <p className="text-[#FFA52F] text-xl font-bold shrink-0">${price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center gap-3 bg-[#EAEAEA] rounded-full p-1">
                                            <button
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#232321] hover:bg-gray-100 transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(incrementQuantity(item.id))}
                                                className="w-8 h-8 rounded-full bg-[#232321] flex items-center justify-center text-white hover:bg-black transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center gap-2 font-semibold text-sm"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="bg-[#232321] text-white rounded-[40px] p-8 md:p-10 sticky top-10 flex flex-col gap-6 relative overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="font-black text-[120px] text-white/5 absolute -bottom-10 -right-5 select-none pointer-events-none leading-none tracking-tighter mix-blend-overlay">
                            KICKS
                        </div>

                        <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-4 relative z-10">Order Summary</h2>

                        <div className="flex flex-col gap-4 text-gray-300 relative z-10 border-b border-white/20 pb-6">
                            <div className="flex justify-between text-lg">
                                <span>Subtotal</span>
                                <span className="font-semibold text-white">${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span>Shipping</span>
                                <span className="font-semibold text-green-400">Free</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span>Tax</span>
                                <span className="font-semibold text-white">$0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end relative z-10 mt-2">
                            <span className="text-xl font-bold uppercase text-gray-400">Total</span>
                            <span className="text-4xl font-extrabold text-[#FFA52F]">${totalAmount.toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-[#4A69E2] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors mt-4 shadow-xl active:scale-[0.98]">
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
