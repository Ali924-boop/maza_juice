"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoreData } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import ReviewSystem from "@/components/ReviewSystem";
import { mangoJuiceProduct } from "@/data/mangojuice";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, ShieldCheck, Zap, Leaf, Star } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [flavor, setFlavor] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [isPremium, setIsPremium] = useState(false);
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        const { flavors, reviews } = getStoreData();
        const found = flavors.find((f: any) => f.id === id);
        setFlavor(found);
        if (id === 'mango') setIsPremium(true);

        const count = reviews.filter((r: any) => r.productId === id).length;
        setReviewCount(count);
    }, [id]);

    if (!flavor) return null;

    if (isPremium) {
        return <PremiumExperience flavor={flavor} addToCart={addToCart} reviewCount={reviewCount} />;
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(flavor);
        }
        toast.success(`${quantity} ${flavor.name} added to cart!`);
    };

    return (
        <StandardExperience
            flavor={flavor}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            reviewCount={reviewCount}
        />
    );
}

function PremiumExperience({ flavor, addToCart, reviewCount }: { flavor: any, addToCart: any, reviewCount: number }) {
    return (
        <main className="bg-neutral-950 min-h-screen">
            <Navbar />

            <div className="relative">
                <ProductBottleScroll product={mangoJuiceProduct} />
                <ProductTextOverlays product={mangoJuiceProduct} />

                {/* Initial Title */}
                <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center px-6"
                    >
                        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter italic uppercase">
                            MANGO <span className="text-maza-orange">MAZA</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-neutral-400 mt-4 tracking-widest uppercase">
                            Premium Extraction Sequence
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Transition Section */}
            <section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative z-20 rounded-t-[4rem] -mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-4xl text-center pt-20"
                >
                    <span className="text-maza-orange font-black uppercase tracking-widest text-sm mb-6 block">Legacy of Taste</span>
                    <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter text-neutral-900 leading-none">
                        THE FINEST <br />
                        <span className="text-maza-orange">ORCHARDS.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="p-8 bg-neutral-50 rounded-[2rem] space-y-4">
                            <Leaf className="text-green-500" size={32} />
                            <h4 className="font-extrabold text-xl">100% Organic</h4>
                            <p className="text-neutral-500 text-sm leading-relaxed">Sourced from certified organic farms where fruit grows as nature intended.</p>
                        </div>
                        <div className="p-8 bg-neutral-50 rounded-[2rem] space-y-4">
                            <Zap className="text-maza-orange" size={32} />
                            <h4 className="font-extrabold text-xl">Cold-Pressed</h4>
                            <p className="text-neutral-500 text-sm leading-relaxed">Preserving all vital minerals and vitamins through low-temperature extraction.</p>
                        </div>
                        <div className="p-8 bg-neutral-50 rounded-[2rem] space-y-4">
                            <ShieldCheck className="text-blue-500" size={32} />
                            <h4 className="font-extrabold text-xl">Zero Waste</h4>
                            <p className="text-neutral-500 text-sm leading-relaxed">Our production cycle is fully sustainable, respecting the earth that feeds us.</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            addToCart(flavor);
                            toast.success(`${flavor.name} added to cart!`);
                        }}
                        className="mt-20 bg-neutral-900 text-white px-12 py-6 rounded-full font-black text-lg uppercase tracking-widest hover:bg-maza-orange transition-all shadow-2xl active:scale-95"
                    >
                        Add to Cart — ${flavor.price}
                    </button>

                    <div className="mt-12 flex items-center justify-center gap-1.5 text-maza-yellow">
                        {"★★★★★".split("").map((s, i) => <Star key={i} size={16} fill="currentColor" />)}
                        <span className="text-neutral-400 text-xs font-bold ml-2 uppercase tracking-widest">({reviewCount} Verified Reviews)</span>
                    </div>
                </motion.div>

                <div className="w-full mt-24">
                    <ReviewSystem productId={flavor.id} />
                </div>
            </section>

            <Footer />
        </main>
    );
}

function StandardExperience({ flavor, quantity, setQuantity, handleAddToCart, reviewCount }: any) {
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
                                    {"★★★★★".split("").map((s, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    <span className="text-neutral-400 text-xs font-bold ml-2 uppercase tracking-widest">
                                        ({reviewCount || "120+"} Verified Reviews)
                                    </span>
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

                <div className="mt-20">
                    <ReviewSystem productId={flavor.id} />
                </div>
            </div>

            <Footer />
        </main>
    );
}
