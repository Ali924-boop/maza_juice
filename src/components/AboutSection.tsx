"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
    const points = [
        "100% Natural fruit pulp",
        "No added preservatives",
        "Rich in vitamins and fiber",
        "Ethically sourced from local farms"
    ];

    return (
        <section className="py-24 px-6 bg-neutral-950 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 relative order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-2 gap-3 md:gap-4"
                    >
                        <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
                            <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden rounded-2xl">
                                <Image
                                    src="https://res.cloudinary.com/dedb21477/image/upload/v1770929008/Fresh_Tropical_Mangoes_lkwklh.png"
                                    alt="Fresh Tropical Mangoes"
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="relative h-32 sm:h-40 md:h-48 w-full overflow-hidden rounded-2xl">
                                <Image
                                    src="https://res.cloudinary.com/dedb21477/image/upload/v1770929009/Tropical_Juice_Refreshment_jc6od7.png"
                                    alt="Tropical Juice Refreshment"
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            <div className="relative h-32 sm:h-40 md:h-48 w-full overflow-hidden rounded-2xl">
                                <Image
                                    src="https://res.cloudinary.com/dedb21477/image/upload/v1770929009/Nature_s_Finest_Fruit_ihtrnn.png"
                                    alt="Maza Core Ingredient"
                                    fill
                                    className="object-contain bg-maza-yellow/5 p-4 hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden rounded-2xl">
                                <Image
                                    src="https://res.cloudinary.com/dedb21477/image/upload/v1770929009/Maza_Core_Ingredient_zrppsw.png"
                                    alt="Nature's Finest Fruit"
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </motion.div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-maza-orange p-4 md:p-8 rounded-full shadow-2xl animate-bounce hidden sm:block">
                        <span className="text-2xl md:text-4xl font-bold text-white">100%</span>
                        <p className="text-[8px] md:text-[10px] uppercase font-bold text-center text-white">Natural</p>
                    </div>
                </div>

                <div className="flex-1 space-y-6 md:space-y-8 order-1 lg:order-2">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-maza-orange font-bold tracking-widest text-xs md:text-sm uppercase"
                    >
                        Our Philosophy
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight"
                    >
                        CRAFTING THE <br />
                        <span className="text-maza-yellow">PERFECT SIP.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-neutral-400 text-lg"
                    >
                        At Maza, we believe that the best flavors come directly from the source. Our journey starts in the sun-drenched orchards where only the plumpest, ripest fruits are chosen.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {points.map((point, index) => (
                            <motion.div
                                key={point}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="text-maza-orange"><CheckCircle2 size={24} /></div>
                                <span className="font-bold text-sm tracking-tight">{point}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="pt-6"
                    >
                        <Link href="/about" className="group flex items-center gap-4 text-white font-bold text-xl hover:text-maza-orange transition-colors">
                            Learn More About Our Heritage
                            <div className="w-12 h-1 bg-maza-orange group-hover:w-20 transition-all" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
