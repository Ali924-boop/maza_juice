"use client";

import {
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle,
    Truck,
    Clock,
    MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStoreData, updateOrderStatus } from "@/lib/store";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setOrders(getStoreData().orders);
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-black">Orders <span className="text-maza-orange">Tracking.</span></h1>
                        <p className="text-neutral-500 text-sm">Manage customer orders, track shipments, and handle returns.</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-white text-sm font-bold hover:bg-neutral-50 transition-all">
                            <Download size={18} /> Export
                        </button>
                        <button className="bg-neutral-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-maza-orange transition-all shadow-lg shadow-black/5">
                            Bulk Actions
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral-100">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl w-full md:w-auto">
                            <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white shadow-sm">All Orders</button>
                            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-neutral-500 hover:bg-white/50 transition-all">Pending</button>
                            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-neutral-500 hover:bg-white/50 transition-all">Shipped</button>
                            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-neutral-500 hover:bg-white/50 transition-all">Delivered</button>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                            <input type="text" placeholder="Search orders..." className="w-full bg-neutral-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-maza-orange transition-all" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-neutral-400 text-xs border-b uppercase tracking-widest font-bold">
                                    <th className="pb-4 pt-2">Order ID</th>
                                    <th className="pb-4 pt-2">Date</th>
                                    <th className="pb-4 pt-2">Customer</th>
                                    <th className="pb-4 pt-2">Status</th>
                                    <th className="pb-4 pt-2">Amount</th>
                                    <th className="pb-4 pt-2 text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {orders.map((order: any) => (
                                    <tr key={order.id} className="border-b last:border-0 hover:bg-neutral-50 transition-colors group">
                                        <td className="py-5 font-bold">{order.id}</td>
                                        <td className="py-5 text-neutral-500">{order.date}</td>
                                        <td className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold tracking-tight">{order.customer}</span>
                                                <span className="text-[10px] text-neutral-400">{order.items} items</span>
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <div className={cn(
                                                "flex items-center gap-1.5 w-max px-3 py-1 rounded-full text-[10px] font-black uppercase text-center",
                                                order.status === "Delivered" ? "bg-green-100 text-green-600" :
                                                    order.status === "Shipped" ? "bg-blue-100 text-blue-600" :
                                                        order.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                                            )}>
                                                {order.status === "Delivered" && <CheckCircle size={10} />}
                                                {order.status === "Shipped" && <Truck size={10} />}
                                                {order.status === "Pending" && <Clock size={10} />}
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="py-5 font-black">{order.amount}</td>
                                        <td className="py-5 text-right pr-2">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 bg-neutral-50 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all opacity-0 group-hover:opacity-100">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 bg-neutral-50 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
