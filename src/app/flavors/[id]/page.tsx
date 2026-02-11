"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoreData } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, ShieldCheck, Zap, Leaf } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [flavor, setFlavor] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const { flavors } = getStoreData();
        const found = flavors.find((f: any) => f.id === id);
        setFlavor(found);
    }, [id]);

    if (!flavor) return null;

    const handleAddToCart = () => {
        // Simple version: loop add or just add once with quantity (context update needed)
        // Let's just add it once for now as per current context, or I could update context.
        // For simplicity right now, I'll just call it 'quantity' times if needed, 
        // but better is to fix context later if needed.
        for (let i = 0; i < quantity; i++) {
            addToCart(flavor);
        }
        toast.success(`${quantity} ${flavor.name} added to cart!`);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden"
                            style={{ backgroundColor: `${flavor.color}15` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/30" />
                            <Image
                                src={flavor.image}
                                alt={flavor.name}
                                fill
                                className="object-contain p-12 drop-shadow-2xl transition-transform hover:scale-105 duration-700"
                            />
                        </motion.div>

                        {/* Content Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <span className="bg-maza-orange/10 text-maza-orange px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                Premium Collection
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black mt-6 mb-4">{flavor.name}</h1>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-3xl font-black text-secondary">${flavor.price}</span>
                                <div className="h-6 w-[1px] bg-neutral-200" />
                                <div className="flex items-center gap-1 text-yellow-400">
                                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                                    <span className="text-neutral-400 text-xs font-bold ml-2">(120+ Reviews)</span>
                                </div>
                            </div>

                            <p className="text-neutral-500 text-lg leading-relaxed mb-10">
                                {flavor.fullDetails || flavor.description}
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <div className="p-4 bg-neutral-50 rounded-2xl text-center">
                                    <Leaf className="mx-auto mb-2 text-green-500" size={20} />
                                    <p className="text-[10px] font-black uppercase text-neutral-400">100% Natural</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-2xl text-center">
                                    <ShieldCheck className="mx-auto mb-2 text-blue-500" size={20} />
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Pure Quality</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-2xl text-center">
                                    <Zap className="mx-auto mb-2 text-maza-orange" size={20} />
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Energy Boost</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center justify-between gap-6 bg-neutral-100 p-2 rounded-2xl sm:w-40">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-maza-orange hover:text-white transition-all shadow-sm"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="font-black text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-maza-orange hover:text-white transition-all shadow-sm"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-maza-orange transition-all shadow-xl shadow-black/10"
                                >
                                    <ShoppingCart size={20} /> Add to Cart — ${(flavor.price * quantity).toFixed(2)}
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-neutral-200 overflow-hidden relative">
                                            <Image src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" fill />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-neutral-400 font-bold">
                                    <span className="text-black">15 people</span> bought this in the last 24 hours
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
