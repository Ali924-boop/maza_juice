"use client";

import {
    Search,
    Filter,
    Mail,
    MapPin,
    History,
    MoreVertical
} from "lucide-react";
import Image from "next/image";
import { getStoreData } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setCustomers(getStoreData().customers);
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-black">Customers <span className="text-maza-orange">Base.</span></h1>
                        <p className="text-neutral-500 text-xs md:text-sm">View customer profiles, order history, and spending habits.</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input type="text" placeholder="Search customers..." className="w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-maza-orange transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {customers.map((customer) => (
                        <div key={customer.id} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-neutral-100 hover:shadow-xl transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-100 overflow-hidden relative">
                                        <Image src={customer.image} alt={customer.name} fill />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">{customer.name}</h3>
                                        <p className="text-xs text-neutral-400 font-medium">Customer ID: #C-00{customer.id}</p>
                                    </div>
                                </div>
                                <button className="p-2 bg-neutral-50 rounded-lg text-neutral-300 hover:text-black">
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-sm text-neutral-500">
                                    <Mail size={16} className="text-neutral-300" />
                                    <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-neutral-500">
                                    <MapPin size={16} className="text-neutral-300" />
                                    <span>{customer.location}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-2xl mb-6">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-1">Total Orders</p>
                                    <p className="font-black text-lg">{customer.orders}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-1">Total Spent</p>
                                    <p className="font-black text-lg">${customer.spent.toLocaleString()}</p>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-maza-orange transition-all shadow-lg shadow-black/5">
                                <History size={16} /> Order History
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
