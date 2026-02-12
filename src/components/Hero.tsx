"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 pb-12">
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

            <div className="relative z-20 max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 space-y-6 md:space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-neutral-900 leading-[0.9] lg:leading-none">
                            PURE <br />
                            <span className="text-maza-orange">TROPICAL</span> <br />
                            ESSENCE.
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
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
                            className="w-full sm:w-auto bg-maza-orange text-white px-8 py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-maza-orange/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-maza-orange/20"
                        >
                            Explore Flavors <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="/about"
                            className="w-full sm:w-auto bg-white/50 backdrop-blur-md border border-black/10 text-neutral-900 px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
                        >
                            Our Story
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex-1 relative"
                >
                    <div className="relative w-[320px] h-[550px] md:w-[450px] md:h-[700px] mx-auto">
                        {/* Interactive Sparkles/Glow */}
                        <div className="absolute inset-0 bg-maza-orange/20 blur-[120px] rounded-full animate-pulse" />
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src="/flavors/mango.png"
                                alt="Maza Premium Bottle"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
