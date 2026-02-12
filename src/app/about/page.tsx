"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Ali Raza Sandha",
        role: "CEO & Founder",
        image: "https://res.cloudinary.com/dedb21477/image/upload/v1770930500/Gemini_Generated_Image_pt279zpt279zpt27_jq4esu.png",
        bio: "With over 20 years of experience in the food and beverage industry, Aditya leads Maza with a vision to bring authentic tropical flavors to the world.",
        socials: { twitter: "#", linkedin: "#", instagram: "#" }
    },
    {
        name: "Sarah Chen",
        role: "Head of Production",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
        bio: "Sarah ensures that every bottle of Maza meets our rigorous quality standards. Her expertise in food science is the backbone of our delicious juices.",
        socials: { twitter: "#", linkedin: "#", instagram: "#" }
    },
    {
        name: "Marcus Thorne",
        role: "Director of Sourcing",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
        bio: "Marcus travels the globe to find the best orchards. He builds lasting relationships with farmers to ensure Maza gets the finest fruit first.",
        socials: { twitter: "#", linkedin: "#", instagram: "#" }
    }
];

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24">
            <Navbar />

            {/* Hero Section for About Page */}
            <section className="py-12 md:py-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8"
                    >
                        OUR <span className="text-maza-orange">STORY</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 leading-relaxed px-2"
                    >
                        Maza started as a small family orchard with a simple mission: to capture the pure essence of a perfect mango. Today, we've grown into a global brand, but our heart remains in those same sun-drenched orchards.
                    </motion.p>
                </div>
            </section>

            {/* CEO Section */}
            <section className="py-16 md:py-24 px-4 md:px-6 bg-neutral-50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full lg:flex-1"
                    >
                        <div className="relative group w-full max-w-md mx-auto lg:max-w-none aspect-[4/5]">
                            <div className="absolute inset-0 bg-maza-orange/20 rounded-3xl translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
                            <Image src={team[0].image} alt={team[0].name} fill className="object-cover rounded-3xl shadow-xl" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left"
                    >
                        <span className="text-maza-orange font-bold uppercase tracking-widest text-[10px] md:text-sm">Message from our CEO</span>
                        <h2 className="text-3xl md:text-4xl font-black">{team[0].name}</h2>
                        <p className="text-base md:text-lg text-neutral-600 italic leading-relaxed">"At Maza, we don't just sell juice; we bottle the feeling of a perfect tropical afternoon. Our commitment to quality is what sets us apart."</p>
                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed">{team[0].bio}</p>
                        <div className="flex justify-center lg:justify-start gap-6 pt-4">
                            <a href={team[0].socials.twitter} className="text-neutral-400 hover:text-maza-orange transition-colors"><Facebook size={20} /></a>
                            <a href={team[0].socials.linkedin} className="text-neutral-400 hover:text-maza-orange transition-colors"><Linkedin size={20} /></a>
                            <a href={team[0].socials.instagram} className="text-neutral-400 hover:text-maza-orange transition-colors"><Instagram size={20} /></a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">THE TEAM BEHIND THE MAGIC</h2>
                        <div className="w-24 h-1 bg-maza-orange mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {team.slice(1).map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="group"
                            >
                                <div className="relative overflow-hidden rounded-2xl aspect-square mb-6">
                                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <a href={member.socials.twitter} className="text-white hover:text-maza-orange"><Twitter size={20} /></a>
                                        <a href={member.socials.linkedin} className="text-white hover:text-maza-orange"><Linkedin size={20} /></a>
                                        <a href={member.socials.instagram} className="text-white hover:text-maza-orange"><Instagram size={20} /></a>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-maza-orange text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-neutral-500 text-sm">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
