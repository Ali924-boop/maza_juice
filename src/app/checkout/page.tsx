"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurePaymentProcessor from "@/components/SecurePaymentProcessor";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    Truck,
    ShieldCheck,
    CheckCircle2,
    ShoppingBag,
    MapPin,
    Smartphone,
    Wallet,
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

    const validateSecureFields = () => {
        if (paymentMethod === "card") {
            if (form.cardNumber.length < 19) {
                toast.error("Valid card number is required");
                return false;
            }
            if (!form.expiry.includes("/")) {
                toast.error("Valid expiry date is required");
                return false;
            }
            if (form.cvv.length < 3) {
                toast.error("Valid CVV is required");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.address) {
            toast.error("Please fill in all logistics fields.");
            return;
        }

        if (!validateSecureFields()) return;

        setIsProcessing(true);

        // Simulate secure verification and banking handshake
        await new Promise(resolve => setTimeout(resolve, 3500));

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
            items: cart.reduce((acc, item) => acc + item.quantity, 0),
            paymentMethod: paymentMethod === "card" ? "Credit Card" : "Cash on Delivery"
        };

        // 2. Fetch current store data
        const { orders, customers, flavors } = getStoreData();

        // 3. Update Inventory Stock
        const updatedFlavors = flavors.map((f: any) => {
            const cartItem = cart.find(item => item.id === f.id);
            if (cartItem) {
                return { ...f, stock: Math.max(0, (f.stock || 100) - cartItem.quantity) };
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
        toast.success("Transaction Authorized!", {
            icon: '🛡️',
            style: { background: '#000', color: '#fff', borderRadius: '20px' }
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
                            We've sent a secure receipt to <span className="text-black font-black">{form.email}</span>. Your Maza experience starts now.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link href="/dashboard" className="bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-maza-orange transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                                <ShoppingBag size={18} /> View Dashboard
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
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Authenticated Delivery</p>
                        <p className="font-black text-lg">Expected: Feb 16, 2026</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-10">
                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-neutral-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-maza-orange/5 blur-3xl -mr-32 -mt-32 rounded-full" />
                            <div className="flex items-center gap-4 mb-10 relative z-10">
                                <div className="p-4 bg-maza-orange/10 text-maza-orange rounded-2xl shrink-0">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">Logistics</h2>
                                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Delivery Coordinates</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Full Legal Name</label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                        placeholder="Receiver Name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Secure Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                        placeholder="Order confirmation"
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Shipping Destination</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-200" size={18} />
                                        <input
                                            required
                                            value={form.address}
                                            onChange={e => setForm({ ...form, address: e.target.value })}
                                            className="w-full bg-neutral-50 border-none rounded-2xl pl-14 pr-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                            placeholder="Street, City, Apartment"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 ml-2">Contact Link</label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-200" size={18} />
                                        <input
                                            required
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            className="w-full bg-neutral-50 border-none rounded-2xl pl-14 pr-6 py-4 font-bold text-sm focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-200"
                                            placeholder="Active mobile"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-neutral-100 min-h-[400px]">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-neutral-900 text-white rounded-2xl shrink-0">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">Maza Pay Hub</h2>
                                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Select payment gateway</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("card")}
                                    className={cn(
                                        "p-6 rounded-[2rem] border-2 transition-all text-left flex items-start gap-4",
                                        paymentMethod === "card" ? "border-maza-orange bg-maza-orange/5" : "border-neutral-100 bg-neutral-50"
                                    )}
                                >
                                    <CreditCard size={24} className={paymentMethod === "card" ? "text-maza-orange" : "text-neutral-300"} />
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest">Card Processing</p>
                                        <p className="text-[10px] text-neutral-400 font-bold">Stripe Secured Gateway</p>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("cod")}
                                    className={cn(
                                        "p-6 rounded-[2rem] border-2 transition-all text-left flex items-start gap-4",
                                        paymentMethod === "cod" ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-100 bg-neutral-50"
                                    )}
                                >
                                    <Wallet size={24} className={paymentMethod === "cod" ? "text-white" : "text-neutral-300"} />
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest">Post-Delivery</p>
                                        <p className="text-[10px] text-neutral-400 font-bold">Cash on Delivery</p>
                                    </div>
                                </button>
                            </div>

                            <SecurePaymentProcessor
                                method={paymentMethod}
                                cardNumber={form.cardNumber}
                                onCardNumberChange={(val) => setForm({ ...form, cardNumber: val })}
                                expiry={form.expiry}
                                onExpiryChange={(val) => setForm({ ...form, expiry: val })}
                                cvv={form.cvv}
                                onCvvChange={(val) => setForm({ ...form, cvv: val })}
                                amount={cartTotal}
                                isProcessing={isProcessing}
                            />

                            {paymentMethod === "cod" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-10 p-8 bg-neutral-50 rounded-[2.5rem] border-2 border-dashed border-neutral-200 text-center"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Wallet size={24} className="text-neutral-900" />
                                    </div>
                                    <h4 className="font-black text-sm uppercase tracking-widest mb-2">Authenticated COD</h4>
                                    <p className="text-xs text-neutral-500 font-medium max-w-xs mx-auto">Please keep exact change ready. A security verification PIN will be sent to your mobile before delivery.</p>
                                </motion.div>
                            )}
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-black/5 border border-neutral-100 sticky top-32">
                            <h2 className="text-2xl font-black mb-8 tracking-tight">Order Scope</h2>

                            <div className="space-y-6 mb-10 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-neutral-50 rounded-2xl p-2 relative shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase truncate">{item.name}</h4>
                                            <p className="text-[10px] text-neutral-400 font-bold">QTY: {item.quantity}</p>
                                        </div>
                                        <span className="text-xs font-black text-maza-orange">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-neutral-50 mb-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Total Authorized</span>
                                    <span className="text-4xl font-black tracking-tighter text-neutral-900">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-maza-orange text-white h-16 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-neutral-900 transition-all shadow-2xl shadow-maza-orange/30 active:scale-95 disabled:opacity-50"
                            >
                                {isProcessing ? "SECURELY AUTHORIZING..." : "COMPLETE ORDER"}
                            </button>

                            <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
                                <ShieldCheck size={14} className="text-green-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encryption</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </main>
    );
}
