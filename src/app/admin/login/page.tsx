"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simple mock authentication
        // In a real app, this would be an API call
        setTimeout(() => {
            if (password === "maza-admin-2026") {
                localStorage.setItem("maza_admin_auth", "true");
                router.push("/dashboard");
            } else {
                setError("Invalid admin credentials. Please try again.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-maza-orange rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-maza-yellow rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8">
                        <span className="text-3xl font-black text-white tracking-tighter">MAZA<span className="text-maza-orange">JUICE</span></span>
                    </Link>
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                            <ShieldCheck className="text-maza-orange" size={32} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Restricted Access</h1>
                    <p className="text-neutral-500 text-sm">Please enter the admin secret to continue to the dashboard.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-maza-orange transition-colors" size={20} />
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-maza-orange/50 transition-all placeholder:text-neutral-600"
                            required
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-500 text-xs font-bold text-center"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-maza-orange text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-maza-orange/90 transition-all shadow-xl shadow-maza-orange/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Access Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="pt-6 text-center">
                        <Link href="/" className="text-neutral-500 text-sm hover:text-white transition-colors">
                            Return to Homepage
                        </Link>
                    </div>
                </form>
            </motion.div>

            <div className="mt-20 text-neutral-600 text-[10px] font-bold uppercase tracking-widest text-center">
                Maza Juice Proprietary System © 2026
            </div>
        </main>
    );
}
