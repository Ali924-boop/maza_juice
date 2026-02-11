"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Phone,
    Mail,
    MapPin,
    CheckCircle2,
    ArrowRight,
    MessageSquare,
    ExternalLink,
    HelpCircle,
    ShoppingBag
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [category, setCategory] = useState("General");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Message transmitted successfully!", {
            style: {
                borderRadius: '16px',
                background: '#000',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSuccess(false);
        setCategory("General");
    };

    const whatsappRedirect = () => {
        const text = `Hi Maza! I have a ${category} inquiry.%0A%0AFrom: ${formData.name || 'Anonymous'}%0A%0A${formData.message}`;
        window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
    };

    return (
        <main className="min-h-screen pt-24 bg-neutral-50 relative overflow-hidden">
            <Navbar />

            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-maza-orange/5 blur-[120px] rounded-full -mr-64 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-maza-yellow/5 blur-[120px] rounded-full -ml-64 -mb-32 pointer-events-none" />

            <section className="py-12 md:py-24 px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                        {/* Left Column: Vision & Contact Details */}
                        <div className="flex-1 space-y-12">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-maza-orange font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                                >
                                    Reach the Source
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
                                >
                                    TALK TO <span className="text-maza-orange">MAZA.</span>
                                </motion.h1>
                                <p className="text-neutral-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                                    Whether you're looking for wholesale partnerships or just want to tell us how much you loved the mango, we're all ears.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="group flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-maza-orange/10 cursor-pointer">
                                    <div className="bg-maza-orange text-white p-4 rounded-2xl shadow-lg shadow-maza-orange/20 group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400 mb-1">Direct Line</h4>
                                        <p className="text-xl font-black">+91 (800) 123-MAZA</p>
                                    </div>
                                    <ArrowRight className="ml-auto text-neutral-200 group-hover:text-maza-orange group-hover:translate-x-2 transition-all" size={24} />
                                </div>

                                <div className="group flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-maza-yellow/10 cursor-pointer">
                                    <div className="bg-maza-yellow text-white p-4 rounded-2xl shadow-lg shadow-maza-yellow/20 group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400 mb-1">Email Stream</h4>
                                        <p className="text-xl font-black">hello@mazajuice.com</p>
                                    </div>
                                    <ArrowRight className="ml-auto text-neutral-200 group-hover:text-maza-yellow group-hover:translate-x-2 transition-all" size={24} />
                                </div>

                                <div className="group flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-black/5 cursor-pointer">
                                    <div className="bg-neutral-900 text-white p-4 rounded-2xl shadow-lg shadow-black/20 group-hover:scale-110 transition-transform">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400 mb-1">Our Orchard</h4>
                                        <p className="text-xl font-black leading-tight">Tropical Valley, Mumbai</p>
                                    </div>
                                    <ExternalLink className="ml-auto text-neutral-200 group-hover:text-black group-hover:scale-110 transition-all" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Dynamic Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full lg:w-[540px] bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-black/5 border border-white"
                        >
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-10"
                                    >
                                        <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
                                            <CheckCircle2 size={48} className="text-green-500" />
                                        </div>
                                        <h3 className="text-4xl font-black mb-4 tracking-tighter">MESSAGE <span className="text-maza-orange">SENT!</span></h3>
                                        <p className="text-neutral-500 font-bold mb-10 leading-relaxed max-w-xs mx-auto">
                                            Our team has been alerted. Expect a tropical response within 2 working hours.
                                        </p>
                                        <div className="w-full space-y-4">
                                            <button
                                                onClick={resetForm}
                                                className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-maza-orange transition-all shadow-xl active:scale-95"
                                            >
                                                Back to Home
                                            </button>
                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                                                ID: #MSG-{Math.floor(Math.random() * 9000) + 1000}
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="mb-10">
                                            <h3 className="text-3xl font-black mb-2 tracking-tighter">Send an <span className="text-maza-orange">Inquiry.</span></h3>
                                            <p className="text-neutral-400 font-bold text-sm">Select a category and let us know what's on your mind.</p>
                                        </div>

                                        {/* Category Selectors */}
                                        <div className="flex flex-wrap gap-2 mb-10">
                                            {[
                                                { id: "General", icon: MessageSquare },
                                                { id: "Wholesale", icon: ShoppingBag },
                                                { id: "Support", icon: HelpCircle }
                                            ].map(cat => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setCategory(cat.id)}
                                                    className={cn(
                                                        "flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                        category === cat.id
                                                            ? "bg-neutral-900 text-white shadow-xl shadow-black/10"
                                                            : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100"
                                                    )}
                                                >
                                                    <cat.icon size={14} /> {cat.id}
                                                </button>
                                            ))}
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none transition-all placeholder:text-neutral-300"
                                                        placeholder="Your Name"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none transition-all placeholder:text-neutral-300"
                                                        placeholder="Gmail Address"
                                                    />
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        required
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none transition-all placeholder:text-neutral-300"
                                                        placeholder="Active Phone"
                                                    />
                                                </div>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    required
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none transition-all resize-none placeholder:text-neutral-300"
                                                    placeholder="How can Maza help you today?"
                                                />
                                            </div>

                                            <div className="pt-4 space-y-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-neutral-900 text-white font-black py-5 rounded-2xl hover:bg-maza-orange flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 disabled:opacity-50 text-xs uppercase tracking-[0.2em]"
                                                >
                                                    {isSubmitting ? (
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                        />
                                                    ) : (
                                                        <>Submit Message <Send size={16} /></>
                                                    )}
                                                </button>

                                                <div className="relative flex items-center justify-center py-2">
                                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100"></div></div>
                                                    <span className="relative z-10 bg-white px-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest">or</span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={whatsappRedirect}
                                                    className="w-full bg-[#25D366] text-white font-black py-5 rounded-2xl hover:bg-[#128C7E] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 text-xs uppercase tracking-[0.2em]"
                                                >
                                                    Instant WhatsApp <Phone size={16} />
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
