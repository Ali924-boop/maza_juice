"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Message sent successfully!");

        // Optional: still offer WhatsApp as secondary
        // const whatsappMessage = `Hello Maza Team!%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
        // const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;
        // window.open(whatsappUrl, "_blank");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <main className="min-h-screen pt-24 bg-neutral-50">
            <Navbar />

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                    {/* Contact Info */}
                    <div className="flex-1 space-y-12">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-5xl md:text-7xl font-black mb-6"
                            >
                                GET IN <span className="text-maza-orange">TOUCH.</span>
                            </motion.h1>
                            <p className="text-neutral-500 text-lg">
                                Have a question or want to discuss a wholesale order? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="bg-maza-orange/10 p-4 rounded-2xl text-maza-orange">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Phone</h4>
                                    <p className="text-neutral-500">+91 (800) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-maza-yellow/10 p-4 rounded-2xl text-maza-yellow">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Email</h4>
                                    <p className="text-neutral-500">hello@mazajuice.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-maza-pink/10 p-4 rounded-2xl text-maza-pink">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Location</h4>
                                    <p className="text-neutral-500">123 Mango Street, Tropical Valley,<br />Mumbai, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Fun dynamic element */}
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                y: [0, -10, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="bg-maza-orange p-8 rounded-3xl text-white shadow-2xl shadow-maza-orange/20 relative overflow-hidden"
                        >
                            <div className="relative z-10 font-bold">
                                <p className="text-sm uppercase tracking-widest opacity-80 mb-2">Response Time</p>
                                <p className="text-2xl">Usually within 2 hours</p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl -mr-10 -mt-10 rounded-full" />
                        </motion.div>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-black/5"
                    >
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-3xl font-black mb-4">Message <span className="text-maza-orange">Sent!</span></h3>
                                <p className="text-neutral-500 mb-8">We've received your message and will get back to you within 2 hours.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-sm font-bold text-neutral-400 hover:text-black transition-colors"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-neutral-700">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-maza-orange outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-bold text-neutral-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-maza-orange outline-none transition-all"
                                            placeholder="+91 99999 99999"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-neutral-700">Gmail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-maza-orange outline-none transition-all"
                                        placeholder="john@gmail.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-neutral-700">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-maza-orange outline-none transition-all resize-none"
                                        placeholder="Tell us about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-maza-orange flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
