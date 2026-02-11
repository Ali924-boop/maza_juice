"use client";

import {
    Search,
    Filter,
    Mail,
    MapPin,
    History,
    MoreVertical,
    Trash2,
    Users,
    TrendingUp,
    DollarSign,
    X,
    ExternalLink,
    ChevronRight,
    ShoppingBag
} from "lucide-react";
import Image from "next/image";
import { getStoreData, saveStoreData } from "@/lib/store";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    useEffect(() => {
        const data = getStoreData();
        setCustomers(data.customers);
        setFilteredCustomers(data.customers);
        setOrders(data.orders);
        setMounted(true);
    }, []);

    useEffect(() => {
        let result = customers;

        // Filter by Search
        if (searchTerm) {
            result = result.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        if (sortBy === "spent") {
            result = [...result].sort((a, b) => b.spent - a.spent);
        } else if (sortBy === "orders") {
            result = [...result].sort((a, b) => b.orders - a.orders);
        }

        setFilteredCustomers(result);
    }, [searchTerm, sortBy, customers]);

    if (!mounted) return null;

    const handleDeleteCustomer = (id: number, name: string) => {
        if (confirm(`Are you sure you want to remove ${name} from the database?`)) {
            const updated = customers.filter(c => c.id !== id);
            setCustomers(updated);
            saveStoreData({ customers: updated });
            toast.success(`${name} has been removed.`);
        }
    };

    const getCustomerOrders = (name: string) => {
        return orders.filter(o => o.customer === name);
    };

    const totalSpent = customers.reduce((acc, c) => acc + c.spent, 0);
    const avgSpent = customers.length > 0 ? (totalSpent / customers.length).toFixed(2) : 0;

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-black">Customers <span className="text-maza-orange">Base.</span></h1>
                        <p className="text-neutral-500 text-sm">View customer profiles, order history, and spending habits.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, email, or city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border-none rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-maza-orange transition-all shadow-sm"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full sm:w-auto bg-white border-none rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                        >
                            <option value="recent">Sort by: Recent</option>
                            <option value="spent">Sort by: High Spending</option>
                            <option value="orders">Sort by: Most Orders</option>
                        </select>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                                <Users size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Customers</span>
                        </div>
                        <p className="text-3xl font-black">{customers.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Lifetime Revenue</span>
                        </div>
                        <p className="text-3xl font-black">${totalSpent.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-maza-orange/10 text-maza-orange rounded-2xl">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Avg. Per Customer</span>
                        </div>
                        <p className="text-3xl font-black">${avgSpent}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    <AnimatePresence mode="popLayout">
                        {filteredCustomers.map((customer) => (
                            <motion.div
                                key={customer.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100 hover:shadow-xl transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-maza-orange/5 blur-3xl rounded-full -mr-16 -mt-16" />

                                <div className="flex items-start justify-between mb-8 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-[1.25rem] bg-neutral-100 overflow-hidden relative shadow-inner border-2 border-white">
                                            <Image src={customer.image} alt={customer.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl leading-tight group-hover:text-maza-orange transition-colors">{customer.name}</h3>
                                            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1">ID: #C-00{customer.id}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                                        className="p-2.5 bg-neutral-50 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="space-y-3 mb-8 relative z-10">
                                    <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-500 font-bold">
                                        <Mail size={16} className="text-neutral-300" />
                                        <span>{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-500 font-bold">
                                        <MapPin size={16} className="text-neutral-300" />
                                        <span>{customer.location}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 p-5 bg-neutral-50 rounded-3xl mb-8 relative z-10">
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-neutral-400 tracking-[0.2em] mb-1">Orders</p>
                                        <p className="font-black text-xl">{customer.orders}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-neutral-400 tracking-[0.2em] mb-1">Spending</p>
                                        <p className="font-black text-xl text-maza-orange">${customer.spent.toLocaleString()}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedCustomer(customer)}
                                    className="w-full py-4 bg-neutral-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-maza-orange transition-all shadow-lg active:scale-95"
                                >
                                    <History size={16} /> Order History
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCustomers.length === 0 && (
                    <div className="py-20 text-center">
                        <Users size={40} className="mx-auto text-neutral-200 mb-4" />
                        <p className="text-neutral-400 font-bold">No customers found.</p>
                    </div>
                )}

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedCustomer && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCustomer(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 z-[101] shadow-2xl overflow-hidden max-h-[90vh]"
                            >
                                <button
                                    onClick={() => setSelectedCustomer(null)}
                                    className="absolute top-8 right-8 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <span className="text-maza-orange font-black uppercase tracking-[0.2em] text-xs">Customer Profile</span>
                                <div className="flex items-center gap-6 mt-6 mb-10">
                                    <div className="w-20 h-20 rounded-[2rem] bg-neutral-100 overflow-hidden relative shadow-lg">
                                        <Image src={selectedCustomer.image} alt={selectedCustomer.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black leading-tight">{selectedCustomer.name}</h3>
                                        <p className="text-neutral-500 font-bold flex items-center gap-2 mt-1">
                                            <Mail size={14} /> {selectedCustomer.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mb-6 flex items-center gap-2">
                                            <ShoppingBag size={14} /> Transaction History
                                        </h4>
                                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                                            {getCustomerOrders(selectedCustomer.name).map((order) => (
                                                <div key={order.id} className="flex items-center justify-between p-5 bg-neutral-50 rounded-3xl border border-transparent hover:border-black/5 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[10px] font-black shadow-sm">
                                                            {order.id}
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-sm">{order.flavor}</p>
                                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">{order.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-black text-maza-orange text-lg">${order.amount}</p>
                                                        <p className={cn(
                                                            "text-[9px] font-black uppercase tracking-widest mt-0.5",
                                                            order.status === "Delivered" ? "text-green-500" : "text-blue-500"
                                                        )}>
                                                            {order.status}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {getCustomerOrders(selectedCustomer.name).length === 0 && (
                                                <div className="py-10 text-center p-8 bg-neutral-50 rounded-3xl border border-dashed text-neutral-400 font-bold">
                                                    No orders found for this customer.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t flex gap-4">
                                        <button
                                            onClick={() => {
                                                toast.success(`Email invitation sent to ${selectedCustomer.email}`);
                                            }}
                                            className="flex-1 bg-neutral-100 text-neutral-900 font-black py-4 rounded-2xl hover:bg-neutral-200 transition-all text-sm"
                                        >
                                            Send Email
                                        </button>
                                        <button
                                            onClick={() => setSelectedCustomer(null)}
                                            className="flex-1 bg-black text-white py-4 rounded-2xl font-black text-sm hover:bg-maza-orange transition-all shadow-xl shadow-black/10"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
