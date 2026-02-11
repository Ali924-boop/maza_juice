"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4",
                isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2 shrink-0">
                    <span className="text-maza-orange">MAZA</span>
                    <span className="text-maza-yellow">JUICE</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    <Link href="/" className="text-sm font-medium hover:text-maza-orange transition-colors">Home</Link>
                    <Link href="/flavors" className="text-sm font-medium hover:text-maza-orange transition-colors">Flavors</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-maza-orange transition-colors">About Us</Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-maza-orange transition-colors">Contact</Link>
                    <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest bg-neutral-100 px-2 py-1 rounded text-neutral-400 hover:bg-maza-orange hover:text-white transition-all">Admin</Link>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
                        <ShoppingCart size={20} className="md:size-6" />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={cartCount}
                                className="absolute top-0 right-0 bg-maza-orange text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>
                    <button
                        className="md:hidden p-2 text-neutral-900 border rounded-xl hover:bg-neutral-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-white border-t overflow-hidden md:hidden shadow-2xl"
                    >
                        <div className="p-6 flex flex-col gap-5">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold flex items-center justify-between group">
                                Home <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-maza-orange" />
                            </Link>
                            <Link href="/flavors" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold flex items-center justify-between group">
                                Flavors <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-maza-orange" />
                            </Link>
                            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold flex items-center justify-between group">
                                About Us <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-maza-orange" />
                            </Link>
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold flex items-center justify-between group">
                                Contact <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-maza-orange" />
                            </Link>
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 bg-neutral-900 text-white p-4 rounded-2xl text-center font-bold text-sm tracking-widest uppercase">
                                Admin Dashboard
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
