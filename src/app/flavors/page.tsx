"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { flavors } from "@/data/flavors";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function FlavorsPage() {
    const { addToCart } = useCart();
    return (
        <main className="min-h-screen bg-neutral-50 pt-24">
            <Navbar />

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-black mb-6"
                            >
                                OUR <span className="text-maza-orange">COLLECTION.</span>
                            </motion.h1>
                            <p className="text-neutral-500 text-lg">
                                Discover the full range of Maza's tropical flavors. From the classics to our new exotic blends, there's something for every palate.
                            </p>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search flavor..."
                                    className="w-full bg-white border-none rounded-2xl pl-10 pr-4 py-3 shadow-md outline-none focus:ring-2 focus:ring-maza-orange transition-all"
                                />
                            </div>
                            <button className="bg-white p-3 rounded-2xl shadow-md hover:bg-black hover:text-white transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {flavors.map((flavor, index) => (
                            <motion.div
                                key={flavor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-[2.5rem] p-6 shadow-xl shadow-black/5 hover:shadow-2xl transition-all"
                            >
                                <div
                                    className="h-64 rounded-[2rem] mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-[0.98] transition-all"
                                    style={{ backgroundColor: `${flavor.color}15` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/40" />
                                    <Image
                                        src={flavor.image}
                                        alt={flavor.name}
                                        fill
                                        className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
                                    />
                                    <Link href={`/flavors/${flavor.id}`} className="absolute inset-0 z-10" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">{flavor.name}</h3>
                                        <span className="text-maza-orange font-black">${flavor.price}</span>
                                    </div>
                                    <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                                        {flavor.description}
                                    </p>
                                    <div className="pt-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                addToCart(flavor);
                                                toast.success(`${flavor.name} added to cart!`);
                                            }}
                                            className="flex-1 bg-neutral-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-maza-orange transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                        <Link
                                            href={`/flavors/${flavor.id}`}
                                            className="p-3 bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors"
                                        >
                                            <Plus size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
