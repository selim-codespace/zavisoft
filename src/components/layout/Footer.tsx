import Link from 'next/link';
import { Facebook, Instagram, Twitter, MessageSquare } from 'lucide-react';

export default function Footer() {
    return (
        <div className="w-full px-4 md:px-12 lg:px-24 mb-6">
            <div className="bg-[#4A69E2] text-white rounded-t-[40px] px-8 md:px-16 py-12 md:py-20 flex flex-col md:flex-row justify-between items-center md:items-start relative overflow-hidden">
                <div className="z-10 w-full md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                        JOIN OUR KICKSPLUS<br />CLUB & GET 15% OFF
                    </h2>
                    <p className="text-gray-200 mb-6">Sign up for free! Join the community.</p>
                    <div className="flex w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-transparent border border-white/50 rounded-l-lg px-4 py-3 outline-none focus:border-white placeholder-white/70 flex-grow"
                        />
                        <button className="bg-[#232321] text-white px-6 py-3 font-semibold rounded-r-lg hover:bg-black transition-colors">
                            SUBMIT
                        </button>
                    </div>
                </div>

                <div className="z-10 flex items-center">
                    <span className="text-7xl font-extrabold tracking-tighter">KICKS</span>
                    <span className="text-[#FFA52F] text-2xl font-bold ml-1 mb-10 bg-white rounded-full w-6 h-6 flex items-center justify-center aspect-square leading-none">+</span>
                </div>
            </div>

            <div className="bg-[#232321] text-white rounded-b-[40px] px-8 md:px-16 py-12 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 relative z-10">
                    <div className="col-span-1">
                        <h3 className="text-[#FFA52F] text-xl font-bold mb-4">About us</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                            We are the biggest hyperstore in the universe. We got you all cover with our exclusive collections and latest drops.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[#FFA52F] font-bold text-lg mb-4">Categories</h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Runners</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Sneakers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Basketball</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Outdoor</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Golf</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Hiking</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#FFA52F] font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blogs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#FFA52F] font-bold text-lg mb-4">Follow us</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-[#FFA52F] transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-[#FFA52F] transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-[#FFA52F] transition-colors"><Twitter className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-[#FFA52F] transition-colors"><MessageSquare className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>

                {/* Big Background Text */}
                <div className="absolute inset-x-0 bottom-[-5%] overflow-hidden flex justify-center opacity-[0.9] pointer-events-none select-none z-0">
                    <div className="text-[15rem] leading-[0.7] font-black text-white tracking-tighter">KICKS</div>
                </div>
            </div>

            <div className="text-center text-sm font-medium mt-6 text-[#232321]">
                © All rights reserved
            </div>
        </div>
    );
}
