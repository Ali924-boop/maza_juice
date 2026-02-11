"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
            {/* Background Video/Abstract Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-maza-yellow/40 via-maza-orange/20 to-transparent z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover scale-110 blur-sm brightness-110"
                >
                    {/* Using a placeholder high-quality slow-mo juice video */}
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-orange-juice-being-poured-into-a-glass-4354-large.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-neutral-900 leading-none">
                            PURE <br />
                            <span className="text-maza-orange">TROPICAL</span> <br />
                            ESSENCE.
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Experience the original taste of nature with Maza Juice. Hand-picked fruits, expert craftsmanship, and a burst of sunshine in every bottle.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                    >
                        <Link
                            href="/flavors"
                            className="bg-maza-orange text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-maza-orange/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-maza-orange/20"
                        >
                            Explore Flavors <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="/about"
                            className="bg-white/50 backdrop-blur-md border border-black/10 text-neutral-900 px-8 py-4 rounded-full font-bold hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
                        >
                            Our Story
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="flex-1 relative"
                >
                    {/* This will be the hero image of the bottle */}
                    <div className="relative w-[300px] h-[500px] md:w-[400px] md:h-[600px] mx-auto overflow-visible">
                        <div className="absolute inset-0 bg-maza-yellow blur-[100px] opacity-30 rounded-full animate-pulse" />
                        <Image
                            src="https://images.unsplash.com/photo-1622597467836-f3285f2127fd?q=80&w=1000&auto=format&fit=crop"
                            alt="Maza Mango Bottle"
                            fill
                            className="object-contain relative z-10 drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
