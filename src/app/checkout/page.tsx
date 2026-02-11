"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    Truck,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    ShoppingBag,
    MapPin,
    Smartphone,
    Wallet,
    Info,
    ChevronLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { saveStoreData, getStoreData } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (cart.length === 0 && !isSuccess) {
        router.push("/cart");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.address) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsProcessing(true);

        // Simulate secure verification
        await new Promise(resolve => setTimeout(resolve, 2500));

        const generatedId = `#MZ-${Math.floor(Math.random() * 9000) + 1000}`;
        setOrderId(generatedId);

        // 1. Create new order
        const newOrder = {
            id: generatedId,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            customer: form.name,
            flavor: cart[0].name + (cart.length > 1 ? ` +${cart.length - 1}` : ""),
            status: "Pending",
            amount: cartTotal.toFixed(2),
            items: cart.reduce((acc, item) => acc + item.quantity, 0)
        };

        // 2. Fetch current store data
        const { orders, customers, flavors } = getStoreData();

        // 3. Update Inventory Stock
        const updatedFlavors = flavors.map((f: any) => {
            const cartItem = cart.find(item => item.id === f.id);
            if (cartItem) {
                // Approximate deduction logic
                return { ...f, stock: Math.max(0, (f.stock || 100) - cartItem.quantity * 5) };
            }
            return f;
        });

        // 4. Update Customer CRM
        let updatedCustomers = [...customers];
        const existingCustomerIndex = updatedCustomers.findIndex(c => c.email.toLowerCase() === form.email.toLowerCase());

        if (existingCustomerIndex !== -1) {
            updatedCustomers[existingCustomerIndex] = {
                ...updatedCustomers[existingCustomerIndex],
                orders: updatedCustomers[existingCustomerIndex].orders + 1,
                spent: updatedCustomers[existingCustomerIndex].spent + cartTotal,
                location: `${form.city}, ${form.zip}`
            };
        } else {
            const newCustomer = {
                id: customers.length + 1,
                name: form.name,
                email: form.email,
                location: `${form.city}, ${form.zip}`,
                orders: 1,
                spent: cartTotal,
                image: `https://i.pravatar.cc/150?u=${form.email}`
            };
            updatedCustomers = [newCustomer, ...updatedCustomers];
        }

        // 5. Persist everything
        saveStoreData({
            orders: [newOrder, ...orders],
            flavors: updatedFlavors,
            customers: updatedCustomers
        });

        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
        toast.success("Hooray! Order placed.", {
            icon: '📦',
            style: { background: '#000', color: '#fff', borderRadius: '12px' }
        });
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-neutral-50 pt-24 pb-32">
                <Navbar />
                <div className="max-w-3xl mx-auto px-6 mt-12 md:mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl shadow-black/5 border border-white text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-maza-orange" />

                        <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                            <CheckCircle2 size={48} className="text-green-500" />
                        </div>

                        <span className="text-maza-orange font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Order Successful</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">ORDER <span className="text-maza-orange">PLACED.</span></h1>

                        <div className="bg-neutral-50 rounded-3xl p-6 mb-10 inline-block px-10 border border-neutral-100">
                            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Receipt Number</p>
                            <p className="text-2xl font-black">{orderId}</p>
                        </div>

                        <p className="text-neutral-500 font-medium mb-12 text-lg max-w-md mx-auto">
                            We've sent a detailed summary to <span className="text-black font-black">{form.email}</span>. Your Maza experience starts now.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link href="/dashboard/orders" className="bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-maza-orange transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                                <ShoppingBag size={18} /> Manage Orders
                            </Link>
                            <Link href="/flavors" className="bg-neutral-100 text-neutral-900 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
                                Continue Shopping
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50 pt-24 pb-32 font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <Link href="/cart" className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors font-black text-[10px] uppercase tracking-widest mb-4">
                            <ChevronLeft size={16} /> Back to Cart
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">CHECK<span className="text-maza-orange">OUT.</span></h1>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
                        <p className="font-black text-lg">Feb 14 - Feb 16, 2026</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Section 1: Logistics */}
                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-neutral-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-maza-orange/5 blur-3xl -mr-32 -mt-32 rounded-full" />

                            <div className="flex items-center gap-4 mb-10 relative z-10">
                                <div className="p-4 bg-maza-orange/10 text-maza-orange rounded-2xl shrink-0">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">Shipping Info</h2>
                                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Where should we send your Maza?</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Receiver's Name</label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Contact Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                        placeholder="Gmail address"
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Detailed Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-200" size={18} />
                                        <input
                                            required
                                            value={form.address}
                                            onChange={e => setForm({ ...form, address: e.target.value })}
                                            className="w-full bg-neutral-50 border-none rounded-2xl pl-14 pr-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                            placeholder="Street, Tower, Apartment"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">City / Area</label>
                                    <input
                                        required
                                        value={form.city}
                                        onChange={e => setForm({ ...form, city: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                        placeholder="e.g. Mumbai"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Phone</label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-200" size={18} />
                                        <input
                                            required
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            className="w-full bg-neutral-50 border-none rounded-2xl pl-14 pr-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                            placeholder="+91"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Payments */}
                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-neutral-900 text-white rounded-2xl shrink-0">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">Payment Hub</h2>
                                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Select your preferred gateway</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("card")}
                                    className={cn(
                                        "p-6 rounded-[2rem] border-2 transition-all text-left flex items-start gap-4",
                                        paymentMethod === "card" ? "border-maza-orange bg-maza-orange/5 shadow-lg shadow-maza-orange/5" : "border-neutral-100 bg-neutral-50 hover:bg-neutral-100"
                                    )}
                                >
                                    <div className={cn("p-3 rounded-xl", paymentMethod === "card" ? "bg-maza-orange text-white" : "bg-white text-neutral-300")}>
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest mb-1">Credit / Debit Card</p>
                                        <p className="text-[10px] text-neutral-400 font-bold leading-relaxed">Secure transaction via Stripe / Maza Pay gateway.</p>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("cod")}
                                    className={cn(
                                        "p-6 rounded-[2rem] border-2 transition-all text-left flex items-start gap-4",
                                        paymentMethod === "cod" ? "border-neutral-900 bg-neutral-900 text-white shadow-lg" : "border-neutral-100 bg-neutral-50 hover:bg-neutral-100"
                                    )}
                                >
                                    <div className={cn("p-3 rounded-xl", paymentMethod === "cod" ? "bg-white text-black" : "bg-white text-neutral-300")}>
                                        <Wallet size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest mb-1">Cash on Delivery</p>
                                        <p className={cn("text-[10px] font-bold leading-relaxed", paymentMethod === "cod" ? "text-neutral-400" : "text-neutral-400")}>
                                            Pay the delivery executive upon arrival.
                                        </p>
                                    </div>
                                </button>
                            </div>

                            {paymentMethod === "card" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-8 p-8 bg-neutral-900 rounded-[2.5rem] border border-neutral-800 shadow-2xl relative overflow-hidden"
                                >
                                    {/* Security Glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-maza-orange/10 blur-3xl -mr-16 -mt-16 rounded-full" />

                                    <div className="flex items-center gap-3 text-maza-orange mb-8 relative z-10">
                                        <ShieldCheck size={18} />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Mock Encrypted Gateway</p>
                                    </div>

                                    <div className="space-y-4 max-w-sm relative z-10">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500 ml-2">Secure Card Number</label>
                                            <input
                                                type="text"
                                                maxLength={19}
                                                value={form.cardNumber}
                                                onChange={e => {
                                                    const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                                    setForm({ ...form, cardNumber: val });
                                                }}
                                                className="h-14 w-full bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-black text-white focus:ring-2 focus:ring-maza-orange outline-none transition-all placeholder:text-neutral-700"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500 ml-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    maxLength={5}
                                                    value={form.expiry}
                                                    onChange={e => {
                                                        const val = e.target.value.replace(/\//g, '').replace(/(\d{2})/, '$1/').trim();
                                                        setForm({ ...form, expiry: val });
                                                    }}
                                                    className="h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-black text-white focus:ring-2 focus:ring-maza-orange outline-none transition-all placeholder:text-neutral-700"
                                                    placeholder="MM / YY"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500 ml-2">CVC / CVV</label>
                                                <input
                                                    type="password"
                                                    maxLength={3}
                                                    value={form.cvv}
                                                    onChange={e => setForm({ ...form, cvv: e.target.value })}
                                                    className="h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-black text-white focus:ring-2 focus:ring-maza-orange outline-none transition-all placeholder:text-neutral-700"
                                                    placeholder="•••"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </section>
                    </div>

                    {/* Order Review Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-black/5 border border-neutral-100 sticky top-32">
                            <h2 className="text-2xl font-black mb-8 tracking-tight">Order Summary</h2>

                            <div className="space-y-6 mb-10 max-h-[30vh] overflow-y-auto pr-4 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-5 group">
                                        <div className="w-16 h-16 bg-neutral-50 rounded-[1.25rem] p-2 relative shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-black truncate text-neutral-800">{item.name}</h4>
                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
                                        </div>
                                        <span className="text-sm font-black text-maza-orange">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-neutral-50 mb-10">
                                <div className="flex justify-between text-xs font-black uppercase tracking-[0.2em] text-neutral-400">
                                    <span>Base Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs font-black uppercase tracking-[0.2em] text-neutral-400">
                                    <span>Delivery</span>
                                    <span className="text-green-500">FREE</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <span className="text-sm font-black uppercase tracking-[0.3em]">Grand Total</span>
                                    <span className="text-4xl font-black tracking-tighter text-neutral-900">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-maza-orange text-white h-16 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-neutral-900 transition-all shadow-2xl shadow-maza-orange/30 disabled:opacity-50 active:scale-95"
                            >
                                {isProcessing ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>Authorize Payment <CheckCircle2 size={18} /></>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-3 mt-10 p-5 bg-neutral-50 rounded-3xl border border-neutral-100">
                                <div className="p-2 bg-white rounded-xl shadow-sm"><ShieldCheck size={16} className="text-green-500" /></div>
                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">AES-256 Bit Secure Connection</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </main>
    );
}
