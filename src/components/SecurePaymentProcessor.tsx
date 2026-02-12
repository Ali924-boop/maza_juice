"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PaymentProcessorProps {
    method: string;
    cardNumber: string;
    onCardNumberChange: (val: string) => void;
    expiry: string;
    onExpiryChange: (val: string) => void;
    cvv: string;
    onCvvChange: (val: string) => void;
    amount: number;
    isProcessing: boolean;
}

export default function SecurePaymentProcessor({
    method,
    cardNumber,
    onCardNumberChange,
    expiry,
    onExpiryChange,
    cvv,
    onCvvChange,
    amount,
    isProcessing
}: PaymentProcessorProps) {
    const [cardType, setCardType] = useState<"visa" | "mastercard" | "unknown">("unknown");
    const [isFocused, setIsFocused] = useState<string | null>(null);

    useEffect(() => {
        if (cardNumber.startsWith("4")) setCardType("visa");
        else if (cardNumber.startsWith("5")) setCardType("mastercard");
        else setCardType("unknown");
    }, [cardNumber]);

    if (method !== "card") return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 relative"
        >
            <div className="bg-neutral-900 rounded-[2.5rem] p-8 md:p-10 border border-neutral-800 shadow-2xl overflow-hidden relative group">
                {/* Security Glow Effects */}
                <div
                    className={cn(
                        "absolute -top-32 -right-32 w-64 h-64 bg-maza-orange/10 blur-[80px] rounded-full transition-opacity duration-700",
                        isProcessing ? "opacity-100 animate-pulse" : "opacity-40"
                    )}
                />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full opacity-40" />

                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-maza-orange/20 rounded-xl flex items-center justify-center text-maza-orange shadow-lg shadow-maza-orange/10">
                            <Lock size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-maza-orange">Secure Payment Gateway</p>
                            <p className="text-white font-bold text-xs">AES-256 Bit Encryption Active</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 py-2 px-4 rounded-xl border border-white/5">
                        <div className={cn("text-white/20 transition-colors", cardType === "visa" && "text-blue-400")}>
                            <CreditCard size={20} />
                        </div>
                        <div className={cn("text-white/20 transition-colors", cardType === "mastercard" && "text-orange-400")}>
                            <CreditCard size={20} />
                        </div>
                    </div>
                </div>

                {/* Secure Form Fields */}
                <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Authorized Card Number</label>
                            {cardNumber.length >= 19 && (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500">
                                    <CheckCircle2 size={12} />
                                </motion.span>
                            )}
                        </div>
                        <div
                            className={cn(
                                "relative transition-all duration-300 rounded-2xl border bg-white/5",
                                isFocused === "card" ? "border-maza-orange shadow-lg shadow-maza-orange/5" : "border-white/10"
                            )}
                        >
                            <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                            <input
                                type="text"
                                maxLength={19}
                                onFocus={() => setIsFocused("card")}
                                onBlur={() => setIsFocused(null)}
                                value={cardNumber}
                                onChange={e => {
                                    const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                    onCardNumberChange(val);
                                }}
                                className="w-full h-16 bg-transparent px-14 text-base font-black text-white outline-none placeholder:text-neutral-700 tracking-widest"
                                placeholder="0000 0000 0000 0000"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-2">Expiration</label>
                            <input
                                type="text"
                                maxLength={5}
                                onFocus={() => setIsFocused("expiry")}
                                onBlur={() => setIsFocused(null)}
                                value={expiry}
                                onChange={e => {
                                    const val = e.target.value.replace(/\D/g, '').replace(/(\d{2})/, '$1/').trim();
                                    onExpiryChange(val);
                                }}
                                className={cn(
                                    "w-full h-16 bg-white/5 border rounded-2xl px-6 text-sm font-black text-white outline-none transition-all placeholder:text-neutral-700 tracking-[0.2em]",
                                    isFocused === "expiry" ? "border-maza-orange border-2" : "border-white/10"
                                )}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-2">Secure CCV</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                                <input
                                    type="password"
                                    maxLength={3}
                                    onFocus={() => setIsFocused("cvv")}
                                    onBlur={() => setIsFocused(null)}
                                    value={cvv}
                                    onChange={e => onCvvChange(e.target.value)}
                                    className={cn(
                                        "w-full h-16 bg-white/5 border rounded-2xl px-12 text-sm font-black text-white outline-none transition-all placeholder:text-neutral-700 tracking-widest",
                                        isFocused === "cvv" ? "border-maza-orange border-2" : "border-white/10"
                                    )}
                                    placeholder="•••"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Visualizer - Premium Interaction */}
                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-12 text-center"
                        >
                            <div className="relative mb-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-20 h-20 border-t-2 border-r-2 border-maza-orange rounded-full shadow-[0_0_30px_rgba(255,122,0,0.3)]"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Lock size={20} className="text-maza-orange animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-2">Authenticating Transaction</h3>
                            <p className="text-neutral-500 text-[10px] font-bold max-w-[200px]">Requesting authorization from bank gateway...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Verification Footer */}
            <div className="mt-4 flex items-center justify-between px-6">
                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400">VeriSign Secured</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">${amount.toFixed(2)} USD</span>
                </div>
            </div>
        </motion.div>
    );
}
