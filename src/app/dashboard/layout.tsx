"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for auth token/flag
        const auth = localStorage.getItem("maza_admin_auth");

        if (auth === "true") {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            // Redirect to login if not authenticated
            router.push("/admin/login");
        }
    }, [router]);

    // Show loading or blank while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-12 h-12 border-4 border-maza-orange border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-col lg:flex-row bg-neutral-50 min-h-screen overflow-x-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="text-sm font-black tracking-tighter">
                        <span className="text-maza-orange">MAZA</span> ADMIN
                    </div>
                    <div className="w-10"></div> {/* Spacer for alignment */}
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key="dashboard-content"
                        className="flex-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
