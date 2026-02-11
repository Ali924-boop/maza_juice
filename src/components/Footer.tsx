"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-white pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <span className="text-maza-orange">MAZA</span>
                        <span className="text-maza-yellow">JUICE</span>
                    </Link>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Bringing the pure essence of tropical fruits to your doorstep. Premium quality, natural taste, and zero compromises.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-maza-orange transition-colors">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-maza-orange transition-colors">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-maza-orange transition-colors">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-maza-orange transition-colors">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-sm text-neutral-400">
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/flavors" className="hover:text-white transition-colors">Flavors</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Wholesale</Link></li>
                        <li><Link href="/dashboard" className="text-maza-yellow font-bold hover:text-white transition-colors italic uppercase tracking-tighter">Admin Dashboard</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6">Trending Flavors</h4>
                    <ul className="space-y-4 text-sm text-neutral-400">
                        <li><Link href="/flavors/mango" className="hover:text-white transition-colors">Classic Mango</Link></li>
                        <li><Link href="/flavors/guava" className="hover:text-white transition-colors">Pink Guava</Link></li>
                        <li><Link href="/flavors/litchi" className="hover:text-white transition-colors">Luscious Litchi</Link></li>
                        <li><Link href="/flavors/mixed-fruit" className="hover:text-white transition-colors">Mixed Fruit Bliss</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6">Newsletter</h4>
                    <p className="text-sm text-neutral-400 mb-4">Stay updated with our latest releases and offers.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-white/10 border-0 rounded-lg px-4 py-2 text-sm flex-1 focus:ring-1 focus:ring-maza-orange outline-none"
                        />
                        <button className="bg-maza-orange px-4 py-2 rounded-lg text-sm font-bold hover:bg-maza-orange/80 transition-colors">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
                <p>© 2026 Maza Juice Company. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms of Service</Link>
                    <Link href="#">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}
