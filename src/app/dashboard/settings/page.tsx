"use client";

import {
    Bell,
    Lock,
    User,
    Globe,
    Palette,
    Check
} from "lucide-react";

import { useState, useEffect } from "react";

export default function SettingsPage() {
    const [mounted, setMounted] = useState(false);
    const [profile, setProfile] = useState({
        name: "Aditya Verma",
        email: "ceo@mazajuice.com"
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-black mb-10">Admin <span className="text-maza-orange">Settings.</span></h1>

                <div className="max-w-4xl space-y-8">
                    {/* Section 1 */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-neutral-100 rounded-2xl"><User size={24} /></div>
                            <div>
                                <h3 className="text-xl font-bold">Profile Information</h3>
                                <p className="text-sm text-neutral-400">Update your personal and business details.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">FullName</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full bg-neutral-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-maza-orange outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full bg-neutral-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-maza-orange outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-neutral-100 rounded-2xl"><Bell size={24} /></div>
                            <div>
                                <h3 className="text-xl font-bold">Notifications</h3>
                                <p className="text-sm text-neutral-400">How you receive alerts about new orders and stock levels.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                                <div>
                                    <p className="font-bold text-sm">Order Alerts</p>
                                    <p className="text-xs text-neutral-400">Real-time alerts for every new purchase.</p>
                                </div>
                                <div className="w-12 h-6 bg-maza-orange rounded-full relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                                <div>
                                    <p className="font-bold text-sm">Low Stock Alerts</p>
                                    <p className="text-xs text-neutral-400">Get notified when stock drops below 10%.</p>
                                </div>
                                <div className="w-12 h-6 bg-maza-orange rounded-full relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="bg-black text-white px-10 py-4 rounded-[2rem] font-bold hover:bg-maza-orange transition-all flex items-center gap-2 shadow-xl shadow-black/10">
                            <Check size={20} /> Save Changes
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
