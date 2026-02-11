"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleClearCart = () => {
        // Not implemented in context yet but can be added or just remove all
        toast.success("Cart cleared");
    };

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-neutral-50 pt-24">
                <Navbar />
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-12 shadow-xl border border-neutral-100 max-w-2xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={40} className="text-neutral-300" />
                        </div>
                        <h1 className="text-4xl font-black mb-4">Your cart is <span className="text-maza-orange">empty.</span></h1>
                        <p className="text-neutral-500 mb-8">Looks like you haven't added any tropical goodness yet.</p>
                        <Link href="/flavors" className="bg-maza-orange text-white px-8 py-4 rounded-2xl font-bold hover:bg-maza-orange/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-maza-orange/20">
                            Start Shopping <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50 pt-24">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-5xl font-black mb-12">MY <span className="text-maza-orange">CART.</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 flex items-center gap-6"
                                >
                                    <div className="w-24 h-24 bg-neutral-50 rounded-2xl p-2 relative shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-contain" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold truncate">{item.name}</h3>
                                        <p className="text-sm text-neutral-400 font-medium">Carton of 12 Bottles</p>
                                        <p className="text-maza-orange font-black mt-1">${item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-4 bg-neutral-50 rounded-xl p-1 shrink-0">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-3 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-neutral-100 sticky top-32">
                            <h2 className="text-2xl font-black mb-8">Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-neutral-500">
                                    <span className="font-medium">Subtotal</span>
                                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-500">
                                    <span className="font-medium">Shipping</span>
                                    <span className="font-bold text-green-500">FREE</span>
                                </div>
                                <div className="pt-4 border-t flex justify-between">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-black text-maza-orange">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-bold text-center flex items-center justify-center gap-3 hover:bg-maza-orange transition-all shadow-lg shadow-black/5"
                            >
                                Checkout Now <ArrowRight size={20} />
                            </Link>

                            <p className="text-[10px] text-neutral-400 text-center mt-6 font-medium uppercase tracking-widest">
                                Taxes calculated at checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
