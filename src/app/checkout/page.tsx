"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { saveStoreData, getStoreData } from "@/lib/store";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });

    if (cart.length === 0 && !isSuccess) {
        router.push("/cart");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create new order
        const newOrder = {
            id: `#MZ-${Math.floor(Math.random() * 9000) + 1000}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            customer: form.name,
            flavor: cart[0].name + (cart.length > 1 ? ` +${cart.length - 1}` : ""),
            status: "Pending",
            amount: cartTotal.toFixed(2),
            items: cart.reduce((acc, item) => acc + item.quantity, 0)
        };

        // Save to store
        const { orders } = getStoreData();
        saveStoreData({ orders: [newOrder, ...orders] });

        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
        toast.success("Order placed successfully!");
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-neutral-50 pt-24 text-center">
                <Navbar />
                <div className="max-w-2xl mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-12 shadow-xl border border-neutral-100"
                    >
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="text-green-500" />
                        </div>
                        <h1 className="text-4xl font-black mb-4">THANK <span className="text-maza-orange">YOU.</span></h1>
                        <p className="text-neutral-500 mb-8">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
                        <div className="space-y-4">
                            <Link href="/dashboard" className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
                                Track Your Order
                            </Link>
                            <Link href="/" className="w-full text-neutral-400 font-bold hover:text-black transition-colors">
                                Back to Home
                            </Link>
                        </div>
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
                <h1 className="text-5xl font-black mb-12">CHECK<span className="text-maza-orange">OUT.</span></h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-neutral-50 rounded-2xl text-maza-orange">
                                    <Truck size={24} />
                                </div>
                                <h2 className="text-2xl font-black">Shipping Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-3 placeholder:text-neutral-300 focus:ring-2 focus:ring-maza-orange transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-3 placeholder:text-neutral-300 focus:ring-2 focus:ring-maza-orange transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Shipping Address</label>
                                    <input
                                        required
                                        value={form.address}
                                        onChange={e => setForm({ ...form, address: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-3 placeholder:text-neutral-300 focus:ring-2 focus:ring-maza-orange transition-all"
                                        placeholder="Street address, apartment, suite"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">City</label>
                                    <input
                                        required
                                        value={form.city}
                                        onChange={e => setForm({ ...form, city: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-3 placeholder:text-neutral-300 focus:ring-2 focus:ring-maza-orange transition-all"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">ZIP / Postal Code</label>
                                    <input
                                        required
                                        value={form.zip}
                                        onChange={e => setForm({ ...form, zip: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-3 placeholder:text-neutral-300 focus:ring-2 focus:ring-maza-orange transition-all"
                                        placeholder="00000"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100 opacity-60 pointer-events-none">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-neutral-50 rounded-2xl text-maza-orange">
                                    <CreditCard size={24} />
                                </div>
                                <h2 className="text-2xl font-black">Payment Method</h2>
                            </div>
                            <p className="text-sm text-neutral-500 mb-8">All transactions are secure and encrypted. (Simulated)</p>
                            <div className="p-6 border-2 border-dashed rounded-3xl text-center text-neutral-400 font-bold">
                                Credit Card Payment Gateway Integrated
                            </div>
                        </section>
                    </div>

                    {/* Order Review */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-neutral-100 sticky top-32">
                            <h2 className="text-2xl font-black mb-8">Order Review</h2>

                            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-neutral-50 rounded-xl p-1 relative shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold truncate">{item.name}</h4>
                                            <p className="text-[10px] text-neutral-400 font-bold">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="text-xs font-black">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t mb-8">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Amount</span>
                                    <span className="text-2xl font-black text-maza-orange">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-maza-orange text-white py-5 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-maza-orange/90 transition-all shadow-xl shadow-maza-orange/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>Place Order Now <ArrowRight size={20} /></>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-6 text-neutral-400">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] uppercase font-bold tracking-widest">Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </main>
    );
}
