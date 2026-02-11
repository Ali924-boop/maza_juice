"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="text-maza-orange">MAZA</span>
                    <span className="text-maza-yellow">JUICE</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium hover:text-maza-orange transition-colors">Home</Link>
                    <Link href="/flavors" className="text-sm font-medium hover:text-maza-orange transition-colors">Flavors</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-maza-orange transition-colors">About Us</Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-maza-orange transition-colors">Contact</Link>
                    <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest bg-neutral-100 px-2 py-1 rounded text-neutral-400 hover:bg-maza-orange hover:text-white transition-all">Admin</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={cartCount}
                                className="absolute top-0 right-0 bg-maza-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>
                    <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-t p-6 md:hidden flex flex-col gap-4 shadow-xl"
                    >
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Home</Link>
                        <Link href="/flavors" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Flavors</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">About Us</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Contact</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
