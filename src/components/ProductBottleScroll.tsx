"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

interface ProductBottleScrollProps {
    product: any;
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll();

    // Map scroll progress to 120 frames
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 120]);

    useEffect(() => {
        const preloadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= 120; i++) {
            const img = new Image();
            img.src = `${product.folderPath}/${i}.webp`;
            img.onload = () => {
                loadedCount++;
                preloadedImages[i] = img;
                // Show first frame immediate and batches every 10
                if (loadedCount === 1) setImages([...preloadedImages]);
                else if (loadedCount % 10 === 0 || loadedCount === 120) {
                    setImages([...preloadedImages]);
                }
            };
        }
    }, [product.folderPath]);

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const context = canvas?.getContext("2d");
            if (!canvas || !context) return;

            // Handle retina displays
            const devicePixelRatio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * devicePixelRatio;
            canvas.height = window.innerHeight * devicePixelRatio;
            context.scale(devicePixelRatio, devicePixelRatio);

            const index = Math.floor(frameIndex.get());
            const image = images[index];

            if (image) {
                const hRatio = window.innerWidth / image.width;
                const vRatio = window.innerHeight / image.height;
                const ratio = Math.min(hRatio, vRatio);
                const centerShift_x = (window.innerWidth - image.width * ratio) / 2;
                const centerShift_y = (window.innerHeight - image.height * ratio) / 2;

                context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                context.drawImage(
                    image,
                    0, 0, image.width, image.height,
                    centerShift_x, centerShift_y, image.width * ratio, image.height * ratio
                );
            }
        };

        const unsubscribe = frameIndex.on("change", () => {
            requestAnimationFrame(render);
        });

        const onResize = () => render();
        window.addEventListener("resize", onResize);
        render();

        return () => {
            window.removeEventListener("resize", onResize);
            unsubscribe();
        };
    }, [images, frameIndex]);

    return (
        <div className="h-[500vh] relative w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden canvas-container">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain pointer-events-none"
                    style={{ width: '100vw', height: '100vh' }}
                />
            </div>
        </div>
    );
}
