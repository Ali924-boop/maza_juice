"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { getStoreData, addReview } from "@/lib/store";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Review {
    id: string;
    productId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export default function ReviewSystem({ productId }: { productId: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadReviews = () => {
            const allReviews = getStoreData().reviews;
            const productReviews = allReviews.filter((r: any) => r.productId === productId);
            setReviews(productReviews);
        };
        loadReviews();
    }, [productId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !comment) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        const newReview: Review = {
            id: Math.random().toString(36).substr(2, 9),
            productId,
            userName: name,
            rating,
            comment,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        // Simulate network delay for premium feel
        setTimeout(() => {
            addReview(newReview);
            setReviews(prev => [newReview, ...prev]);
            setName("");
            setComment("");
            setRating(5);
            setIsSubmitting(false);
            toast.success("Review submitted! Thank you for your feedback.");
        }, 800);
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    return (
        <section className="py-24 px-6 bg-neutral-50 rounded-[4rem] mx-4 my-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Stats & Form */}
                    <div className="lg:col-span-1 space-y-10">
                        <div>
                            <span className="text-maza-orange font-black uppercase tracking-[0.3em] text-xs">Testimonials</span>
                            <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-tighter">CUSTOMER <br /> <span className="text-neutral-300 italic">FEEDBACK.</span></h2>

                            <div className="flex items-center gap-6 mt-8">
                                <div className="text-5xl font-black">{avgRating}</div>
                                <div>
                                    <div className="flex text-maza-yellow gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={16} fill={s <= Math.round(Number(avgRating)) ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold text-neutral-400 mt-1 uppercase tracking-widest">{reviews.length} Verified Reviews</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-neutral-100 space-y-6">
                            <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400 mb-2">Write a Review</h4>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-neutral-400">Your Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-maza-orange transition-colors" size={18} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Alex Johnson"
                                        className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-maza-orange/20 transition-all font-bold text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-neutral-400">Rating</label>
                                <div className="flex gap-4 bg-neutral-50 p-4 rounded-2xl justify-between">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setRating(num)}
                                            className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                                rating >= num ? "text-maza-yellow scale-110" : "text-neutral-200"
                                            )}
                                        >
                                            <Star size={24} fill={rating >= num ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-neutral-400">Your Experience</label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-5 text-neutral-300 group-focus-within:text-maza-orange transition-colors" size={18} />
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="How does it taste?"
                                        rows={4}
                                        className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-maza-orange/20 transition-all font-bold text-sm resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-maza-orange transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Share Review <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Reviews List */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <AnimatePresence mode="popLayout">
                                {reviews.length > 0 ? (
                                    reviews.map((review, index) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-neutral-100 group hover:shadow-xl hover:-translate-y-1 transition-all"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center text-maza-orange">
                                                        <User size={24} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black text-sm uppercase tracking-tight flex items-center gap-2">
                                                            {review.userName}
                                                            <CheckCircle2 size={12} className="text-blue-500" />
                                                        </h5>
                                                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{review.date}</span>
                                                    </div>
                                                </div>
                                                <div className="flex text-maza-yellow gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} size={14} fill={s <= review.rating ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-neutral-500 font-medium leading-relaxed italic">
                                                "{review.comment}"
                                            </p>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-neutral-200"
                                    >
                                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MessageSquare size={24} className="text-neutral-300" />
                                        </div>
                                        <p className="text-neutral-400 font-black uppercase tracking-[0.2em] text-[10px]">No reviews yet. Be the first!</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
