"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface ProductTextOverlaysProps {
    product: any;
}

export default function ProductTextOverlays({ product }: ProductTextOverlaysProps) {
    const { scrollYProgress } = useScroll();

    const sections = [
        { data: product.sections[0], range: [0.05, 0.15, 0.25] },
        { data: product.sections[1], range: [0.35, 0.45, 0.55] },
        { data: product.sections[2], range: [0.65, 0.75, 0.85] },
        { data: product.sections[3], range: [0.9, 0.95, 1.0] }
    ];

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {sections.map((section, index) => (
                <OverlayItem
                    key={index}
                    title={section.data.title}
                    subtitle={section.data.subtitle}
                    range={section.range}
                    progress={scrollYProgress}
                />
            ))}
        </div>
    );
}

function OverlayItem({ title, subtitle, range, progress }: { title: string, subtitle: string, range: number[], progress: any }) {
    const opacity = useTransform(progress, [range[0], range[1], range[2]], [0, 1, 0]);
    const scale = useTransform(progress, [range[0], range[1], range[2]], [0.9, 1, 1.1]);
    const y = useTransform(progress, [range[0], range[1], range[2]], [50, 0, -50]);

    return (
        <motion.section
            style={{ opacity, scale, y }}
            className="h-screen w-full flex flex-col items-center justify-center text-center px-6"
        >
            <h2 className="text-7xl md:text-9xl font-black mb-6 uppercase leading-[0.85] text-white">
                {title}
            </h2>
            {subtitle && (
                <p className="text-xl md:text-3xl font-medium text-white/60 max-w-2xl">
                    {subtitle}
                </p>
            )}
        </motion.section>
    );
}
