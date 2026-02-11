"use client";

import {
    Bell,
    Lock,
    User,
    Globe,
    Palette,
    Check,
    Mail,
    Shield,
    Store,
    CreditCard,
    Smartphone,
    Eye,
    EyeOff,
    CheckCircle2,
    Save
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [mounted, setMounted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Settings State
    const [profile, setProfile] = useState({
        name: "Aditya Verma",
        email: "ceo@mazajuice.com",
        role: "Administrator",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100"
    });

    const [storeSettings, setStoreSettings] = useState({
        storeName: "Maza Juice Official",
        supportEmail: "support@mazajuice.com",
        currency: "USD ($)",
        timezone: "GMT +5:00"
    });

    const [notifications, setNotifications] = useState({
        orders: true,
        stock: true,
        weeklyReport: false,
        customerReviews: true
    });

    const [security, setSecurity] = useState({
        twoFactor: false,
        sessionTimeout: "30 mins",
        showPassword: false
    });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem("maza_admin_profile");
        const savedStore = localStorage.getItem("maza_store_settings");
        const savedNotifs = localStorage.getItem("maza_notif_settings");

        if (savedProfile) setProfile(JSON.parse(savedProfile));
        if (savedStore) setStoreSettings(JSON.parse(savedStore));
        if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

        setMounted(true);
    }, []);

    const handleSaveAll = async () => {
        setIsSaving(true);
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1500));

        localStorage.setItem("maza_admin_profile", JSON.stringify(profile));
        localStorage.setItem("maza_store_settings", JSON.stringify(storeSettings));
        localStorage.setItem("maza_notif_settings", JSON.stringify(notifications));

        setIsSaving(false);
        toast.success("Settings updated successfully!", {
            style: {
                borderRadius: '16px',
                background: '#000',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            },
            iconTheme: {
                primary: '#FFB800',
                secondary: '#fff',
            },
        });
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!mounted) return null;

    return (
        <div className="bg-neutral-50 min-h-screen font-sans pb-32">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 max-w-5xl mx-auto">
                    <div>
                        <h1 className="text-3xl font-black">Admin <span className="text-maza-orange">Settings.</span></h1>
                        <p className="text-neutral-500 text-sm">Configure your personal profile and global store preferences.</p>
                    </div>
                    <button
                        onClick={handleSaveAll}
                        disabled={isSaving}
                        className="bg-neutral-900 text-white px-10 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-maza-orange transition-all shadow-2xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
                    >
                        {isSaving ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                        ) : (
                            <><Check size={20} className="group-hover:scale-125 transition-transform" /> Save Changes</>
                        )}
                    </button>
                </div>

                <div className="max-w-5xl mx-auto space-y-10">
                    {/* Profile Management */}
                    <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-maza-orange/5 blur-3xl -mr-32 -mt-32 rounded-full" />

                        <div className="flex items-center gap-6 mb-12 relative z-10">
                            <div className="w-20 h-20 rounded-[2rem] bg-neutral-100 overflow-hidden relative shadow-xl border-4 border-white group">
                                <img src={profile.image} alt="Admin" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Palette size={20} className="text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-2">Personal <span className="text-neutral-300">Profile</span></h3>
                                <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Global Admin ID: MZ-2026-X1</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Full Display Name</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Primary Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Store Configuration */}
                        <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-maza-orange/10 text-maza-orange rounded-2xl"><Store size={24} /></div>
                                <div>
                                    <h3 className="text-xl font-black">Store <span className="text-neutral-300">Settings</span></h3>
                                    <p className="text-xs text-neutral-400 font-bold">Public business information.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Business Name</label>
                                    <input
                                        type="text"
                                        value={storeSettings.storeName}
                                        onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Currency</label>
                                        <select
                                            value={storeSettings.currency}
                                            onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                                            className="w-full bg-neutral-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none"
                                        >
                                            <option>USD ($)</option>
                                            <option>PKR (Rs.)</option>
                                            <option>EUR (€)</option>
                                            <option>GBP (£)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Timezone</label>
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={14} />
                                            <input
                                                type="text"
                                                value={storeSettings.timezone}
                                                readOnly
                                                className="w-full bg-neutral-100 border-none rounded-2xl pl-10 pr-4 py-4 text-sm font-bold text-neutral-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Notifications Control */}
                        <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl"><Bell size={24} /></div>
                                <div>
                                    <h3 className="text-xl font-black">Alerts <span className="text-neutral-300">& Channels</span></h3>
                                    <p className="text-xs text-neutral-400 font-bold">Manage system-generated signals.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { key: "orders", label: "New Order Alerts", desc: "Ping when a purchase is finalized." },
                                    { key: "stock", label: "Low Stock Pings", desc: "Alert when inventory drops below 15%." },
                                    { key: "customerReviews", label: "Review Notifications", desc: "Notify for new customer feedback." },
                                    { key: "weeklyReport", label: "Weekly Sales PDF", desc: "Email a detailed sales summary." },
                                ].map((item) => (
                                    <div
                                        key={item.key}
                                        onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                                        className="flex items-center justify-between p-5 bg-neutral-50 rounded-3xl hover:bg-neutral-100 transition-colors cursor-pointer group"
                                    >
                                        <div className="max-w-[80%]">
                                            <p className="font-black text-sm">{item.label}</p>
                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight mt-1">{item.desc}</p>
                                        </div>
                                        <div className={cn(
                                            "w-12 h-6 rounded-full p-1 transition-all duration-300 relative",
                                            notifications[item.key as keyof typeof notifications] ? "bg-maza-orange" : "bg-neutral-300"
                                        )}>
                                            <motion.div
                                                animate={{ x: notifications[item.key as keyof typeof notifications] ? 24 : 0 }}
                                                className="w-4 h-4 bg-white rounded-full shadow-lg"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Security & Access */}
                    <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-4 bg-neutral-900 text-white rounded-2xl"><Shield size={24} /></div>
                            <div>
                                <h3 className="text-2xl font-black">Security <span className="text-neutral-300">& Protection</span></h3>
                                <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Enhanced account safeguards.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Current Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                        <input
                                            type={security.showPassword ? "text" : "password"}
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-12 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            onClick={() => setSecurity({ ...security, showPassword: !security.showPassword })}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-black transition-colors"
                                        >
                                            {security.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">New Secret Key</label>
                                    <input
                                        type="password"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none"
                                        placeholder="Min. 12 characters"
                                    />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
                                    <h4 className="font-black text-red-500 text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Smartphone size={16} /> Multi-Factor Auth
                                    </h4>
                                    <p className="text-xs text-red-400 font-bold mb-6">Add an extra layer of security to your admin account by requiring a code from your phone.</p>
                                    <button className="w-full py-4 bg-red-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95">
                                        Enable 2FA Protection
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-6 bg-neutral-900 text-white rounded-3xl">
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest">Global Login Notification</p>
                                        <p className="text-[10px] text-neutral-400 font-bold mt-1">Email me for every successful sign-in.</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 size={24} className="text-maza-orange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bottom Floating Bar for Mobile or quick save */}
                    <div className="pt-20 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-2">Version 4.2.0-STABLE</p>
                        <p className="text-neutral-400 text-xs font-bold italic">“Quality is not an act, it is a habit.” — Maza Spirit</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
