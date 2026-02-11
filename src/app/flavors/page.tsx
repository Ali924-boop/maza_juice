"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStoreData } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Search, Filter, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function FlavorsPage() {
    const { addToCart } = useCart();
    const [allFlavors, setAllFlavors] = useState<any[]>([]);
    const [filteredFlavors, setFilteredFlavors] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const data = getStoreData().flavors;
        setAllFlavors(data);
        setFilteredFlavors(data);
        setMounted(true);
    }, []);

    useEffect(() => {
        let result = allFlavors;

        // Search filtering
        if (searchTerm) {
            result = result.filter(f =>
                f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                f.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filtering (Mock categories based on names for now)
        if (activeCategory !== "All") {
            // In a real app, products would have a category field. 
            // Here we'll simulate it.
            if (activeCategory === "New") {
                result = result.filter(f => f.id.includes('k') || f.id.includes('mix')); // dummy logic
            } else if (activeCategory === "Classic") {
                result = result.filter(f => f.name.includes("Classic") || f.id === 'mango');
            }
        }

        setFilteredFlavors(result);
    }, [searchTerm, activeCategory, allFlavors]);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-neutral-50 pt-24">
            <Navbar />

            <section className="py-12 md:py-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Controls */}
                    <div className="mb-12 md:mb-20">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                            <div className="max-w-2xl">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-maza-orange font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                                >
                                    The Premium Collection
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
                                >
                                    OUR <span className="text-maza-orange">FLAVORS.</span>
                                </motion.h1>
                                <p className="text-neutral-500 text-lg md:text-xl font-medium leading-relaxed">
                                    Crafted from the world's most exotic orchards. Every bottle is a 100% natural masterpiece of tropical taste.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                <div className="relative flex-1 lg:w-80 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-maza-orange transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search for a flavor..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-white border-none rounded-2xl pl-12 pr-4 py-4 shadow-xl shadow-black/5 outline-none focus:ring-2 focus:ring-maza-orange transition-all font-bold placeholder:text-neutral-300"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-black"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex bg-white p-1.5 rounded-2xl shadow-xl shadow-black/5">
                                    {["All", "Classic", "New"].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={cn(
                                                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                                activeCategory === cat ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-700"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flavors Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        <AnimatePresence mode="popLayout">
                            {filteredFlavors.map((flavor, index) => (
                                <motion.div
                                    key={flavor.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="group"
                                >
                                    <div className="bg-white rounded-[3rem] p-6 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                                        {/* Dynamic Background Glow */}
                                        <div
                                            className="absolute -top-20 -right-20 w-40 h-40 blur-[80px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                                            style={{ backgroundColor: flavor.secondaryColor || flavor.color }}
                                        />

                                        <div
                                            className="h-64 rounded-[2.5rem] mb-8 flex items-center justify-center relative overflow-hidden bg-neutral-50 group-hover:bg-transparent transition-colors duration-500"
                                            style={{ '--hover-bg': `${flavor.color}15` } as any}
                                        >
                                            <Link href={`/flavors/${flavor.id}`} className="absolute inset-0 z-20" />
                                            <Image
                                                src={flavor.image}
                                                alt={flavor.name}
                                                fill
                                                className="object-contain p-8 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl z-10"
                                            />
                                            {/* Category Tag */}
                                            <div className="absolute top-6 left-6 z-30">
                                                <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                                                    Tropical
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 flex-1 flex flex-col">
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-maza-orange transition-colors">{flavor.name}</h3>
                                                <span className="text-xl font-black text-neutral-900 mt-1">${flavor.price}</span>
                                            </div>
                                            <p className="text-neutral-400 text-sm font-bold line-clamp-2 leading-relaxed flex-1">
                                                {flavor.description}
                                            </p>
                                            <div className="pt-6 flex gap-3">
                                                <button
                                                    onClick={() => {
                                                        addToCart(flavor);
                                                        toast.success(`${flavor.name} added to cart!`, {
                                                            icon: '🥤',
                                                            style: {
                                                                borderRadius: '16px',
                                                                background: '#333',
                                                                color: '#fff',
                                                            }
                                                        });
                                                    }}
                                                    className="flex-1 bg-neutral-900 text-white h-14 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-maza-orange transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingBag size={16} /> Add to Cart
                                                </button>
                                                <Link
                                                    href={`/flavors/${flavor.id}`}
                                                    className="w-14 h-14 bg-neutral-100 rounded-2xl hover:bg-neutral-200 transition-all flex items-center justify-center text-neutral-400 hover:text-black group/btn active:scale-95"
                                                >
                                                    <Plus size={20} className="group-hover/btn:rotate-90 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredFlavors.length === 0 && (
                        <div className="py-40 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search size={32} className="text-neutral-300" />
                                </div>
                                <h2 className="text-2xl font-black mb-2">No flavors found.</h2>
                                <p className="text-neutral-400 font-bold">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                                    className="mt-8 text-maza-orange font-black uppercase tracking-widest text-xs hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
