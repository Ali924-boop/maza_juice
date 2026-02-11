"use client";

import { motion } from "framer-motion";
import { flavors } from "@/data/flavors";
import Link from "next/link";
import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function NewTrending() {
    const { addToCart } = useCart();
    const trending = flavors.slice(0, 3);

    const handleAddToCart = (e: React.MouseEvent, flavor: any) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(flavor);
        toast.success(`${flavor.name} added to cart!`);
    };

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-maza-orange font-bold tracking-widest text-sm uppercase"
                        >
                            Fresh Arrivals
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black mt-2"
                        >
                            TRENDING <span className="text-secondary">FLAVORS</span>
                        </motion.h2>
                    </div>
                    <Link href="/flavors" className="text-sm font-bold border-b-2 border-maza-orange pb-1 hover:text-maza-orange transition-colors">
                        View All Flavors
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {trending.map((flavor, index) => (
                        <motion.div
                            key={flavor.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-neutral-50 rounded-3xl p-8 overflow-hidden"
                        >
                            <div
                                className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 transition-all group-hover:opacity-40"
                                style={{ backgroundColor: flavor.color }}
                            />

                            <div className="relative z-10">
                                <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-500 shadow-sm">
                                    Trending
                                </span>
                                <h3 className="text-2xl font-black mt-4 group-hover:text-maza-orange transition-colors">
                                    {flavor.name}
                                </h3>
                                <p className="text-neutral-500 text-sm mt-2 line-clamp-2">
                                    {flavor.description}
                                </p>
                                <div className="flex items-center justify-between mt-8">
                                    <span className="text-xl font-black">${flavor.price}</span>
                                    <button
                                        onClick={(e) => handleAddToCart(e, flavor)}
                                        className="bg-black text-white p-3 rounded-full hover:bg-maza-orange transition-all scale-100 sm:scale-0 sm:group-hover:scale-100 duration-300 relative z-20 shadow-lg"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Image
                                    src={flavor.image}
                                    alt={flavor.name}
                                    width={300}
                                    height={400}
                                    className="h-48 w-auto object-contain transition-transform group-hover:scale-110 duration-500"
                                />
                            </div>

                            <Link href={`/flavors/${flavor.id}`} className="absolute inset-0 z-0" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
