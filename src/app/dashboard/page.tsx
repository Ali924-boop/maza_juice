"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Bell,
    CheckCircle,
    Truck,
    Clock,
    X,
    Eye,
    ChevronRight,
    History,
    RefreshCcw
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getStoreData, updateOrderStatus } from "@/lib/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const refreshData = () => {
        setData(getStoreData());
    };

    useEffect(() => {
        refreshData();
        setMounted(true);
    }, []);

    if (!data || !mounted) return null;

    // Logic for derived stats
    const totalRevenue = data.orders.reduce((acc: number, o: any) => {
        const amt = typeof o.amount === 'string' ? parseFloat(o.amount.replace('$', '')) : o.amount;
        return acc + amt;
    }, 0);

    const totalOrders = data.orders.length;
    const activeCustomers = data.customers.length;
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    const stats = [
        { name: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, trend: "+12.5%", isPositive: true },
        { name: "Total Orders", value: totalOrders.toString(), icon: ShoppingBag, trend: "+5.4%", isPositive: true },
        { name: "Active Customers", value: activeCustomers.toString(), icon: Users, trend: "-2.1%", isPositive: false },
        { name: "Avg. Order Value", value: `$${avgOrderValue}`, icon: TrendingUp, trend: "+8.2%", isPositive: true },
    ];

    const recentOrders = data.orders.slice(0, 5);

    const handleStatusUpdate = (id: string, newStatus: string) => {
        updateOrderStatus(id, newStatus);
        refreshData();
        if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status: newStatus });
        toast.success(`Order ${id} updated to ${newStatus}`);
    };

    const notifications = [
        { id: 1, title: "New Order #MZ-8821", time: "2 mins ago", type: "success" },
        { id: 2, title: "Low Stock: Classic Mango", time: "45 mins ago", type: "warning" },
        { id: 3, title: "Payout Processed", time: "2 hours ago", type: "info" },
    ];

    return (
        <div className="bg-neutral-50 min-h-screen font-sans pb-20">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10 gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black">Admin <span className="text-maza-orange">Panel.</span></h1>
                        <div className="flex items-center gap-2 text-neutral-500 text-xs md:text-sm mt-1">
                            <Clock size={14} />
                            <span>Last updated: {new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-3 bg-white rounded-2xl border shadow-sm text-neutral-400 hover:text-black transition-all hover:shadow-md relative group active:scale-95"
                            >
                                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-maza-orange rounded-full border-2 border-white animate-pulse" />
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-neutral-100 p-6 z-50"
                                        >
                                            <div className="flex items-center justify-between mb-6">
                                                <h4 className="font-black text-sm uppercase tracking-widest">Inbox</h4>
                                                <button className="text-[10px] font-bold text-maza-orange hover:underline uppercase">Clear All</button>
                                            </div>
                                            <div className="space-y-4">
                                                {notifications.map(n => (
                                                    <div key={n.id} className="flex gap-4 p-3 hover:bg-neutral-50 rounded-2xl transition-colors cursor-pointer group">
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full mt-1.5 shrink-0",
                                                            n.type === "success" ? "bg-green-500" : n.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                                                        )} />
                                                        <div>
                                                            <p className="text-xs font-black text-neutral-800 group-hover:text-maza-orange transition-colors">{n.title}</p>
                                                            <span className="text-[10px] text-neutral-400 font-bold">{n.time}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/dashboard/settings" className="group">
                            <div className="flex items-center gap-2 md:gap-3 bg-white p-1.5 pr-4 md:pr-5 border rounded-full shadow-sm hover:shadow-md hover:border-maza-orange transition-all cursor-pointer">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-100 overflow-hidden relative shrink-0">
                                    <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" alt="Admin" fill className="object-cover group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-xs font-black leading-none">Aditya Verma</p>
                                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">Director</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-[2rem] shadow-sm border border-neutral-100 group hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div className="p-3 bg-neutral-50 rounded-2xl group-hover:bg-maza-orange group-hover:text-white transition-colors duration-500">
                                    <stat.icon size={22} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-xl transition-colors",
                                    stat.isPositive ? "bg-green-50 text-green-600 group-hover:bg-green-500 group-hover:text-white" : "bg-red-50 text-red-600 group-hover:bg-red-500 group-hover:text-white"
                                )}>
                                    {stat.trend} {stat.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                </div>
                            </div>
                            <p className="text-neutral-400 text-xs font-black uppercase tracking-widest">{stat.name}</p>
                            <h3 className="text-3xl font-black mt-2 tracking-tighter">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders Table */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-neutral-100 overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black">Recent <span className="text-neutral-300">Orders</span></h3>
                                <p className="text-xs text-neutral-400 font-bold mt-1">Live transaction feed from your storefront.</p>
                            </div>
                            <Link href="/dashboard/orders">
                                <button className="bg-neutral-50 text-neutral-900 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">View All</button>
                            </Link>
                        </div>

                        <div className="overflow-x-auto -mx-6 md:mx-0">
                            <div className="min-w-[700px] px-6 md:px-0">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-neutral-400 text-[10px] border-b uppercase tracking-[0.2em] font-black">
                                            <th className="pb-4 pt-2">Invoice</th>
                                            <th className="pb-4 pt-2">Customer</th>
                                            <th className="pb-4 pt-2">Cart Info</th>
                                            <th className="pb-4 pt-2">Total</th>
                                            <th className="pb-4 pt-2 text-center">Status</th>
                                            <th className="pb-4 pt-2 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <AnimatePresence mode="popLayout">
                                            {recentOrders.map((order: any) => (
                                                <motion.tr
                                                    key={order.id}
                                                    layout
                                                    className="border-b last:border-0 hover:bg-neutral-50/50 transition-colors group"
                                                >
                                                    <td className="py-5 font-black text-neutral-900">{order.id}</td>
                                                    <td className="py-5">
                                                        <span className="font-bold text-neutral-800">{order.customer}</span>
                                                    </td>
                                                    <td className="py-5">
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-maza-orange text-[11px] truncate max-w-[120px]">{order.flavor}</span>
                                                            <span className="text-[9px] text-neutral-400 font-black uppercase tracking-tighter">{order.items} Carton{order.items > 1 ? 's' : ''}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 font-black text-lg tracking-tighter">${order.amount}</td>
                                                    <td className="py-5">
                                                        <div className={cn(
                                                            "mx-auto w-max px-3 py-1.5 rounded-full text-[9px] font-black tracking-tight uppercase flex items-center gap-1.5",
                                                            order.status === "Delivered" ? "bg-green-50 text-green-600" :
                                                                order.status === "Shipped" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"
                                                        )}>
                                                            {order.status === "Delivered" && <CheckCircle size={10} />}
                                                            {order.status === "Shipped" && <Truck size={10} />}
                                                            {order.status === "Pending" && <Clock size={10} />}
                                                            {order.status}
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="p-2.5 bg-neutral-100 rounded-xl text-neutral-400 hover:text-black hover:bg-white hover:shadow-md transition-all active:scale-95"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Stock Overview & Quick Info */}
                    <div className="space-y-8">
                        {/* Stock Widget */}
                        <div className="bg-maza-orange text-white rounded-[2.5rem] p-8 shadow-xl shadow-maza-orange/30 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[60px] rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />

                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h3 className="text-xl font-black italic">Inventory <span className="opacity-40 not-italic">Health.</span></h3>
                                <RefreshCcw size={18} className="animate-spin-slow cursor-pointer opacity-60 hover:opacity-100" onClick={refreshData} />
                            </div>

                            <div className="space-y-6 relative z-10">
                                {data.flavors.slice(0, 4).map((flavor: any) => {
                                    const stockLevel = flavor.stock || Math.floor(Math.random() * 80) + 10;
                                    return (
                                        <div key={flavor.id}>
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                                                <span className="truncate max-w-[150px]">{flavor.name}</span>
                                                <span>{stockLevel}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${stockLevel}%` }}
                                                    className={cn("h-full bg-white transition-all", stockLevel < 20 ? "bg-red-300" : "")}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <Link href="/dashboard/products">
                                <button className="w-full mt-10 bg-black text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-neutral-900 transition-all shadow-2xl relative z-10">
                                    Restock Collection
                                </button>
                            </Link>
                        </div>

                        {/* Recent Customers Widget */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-neutral-100 rounded-2xl text-neutral-900 shadow-inner">
                                        <Users size={20} />
                                    </div>
                                    <h4 className="font-black text-sm uppercase tracking-widest">Growth</h4>
                                </div>
                                <span className="text-[10px] font-black text-maza-orange bg-maza-orange/10 px-2 py-1 rounded-lg">+{data.customers.length} TOTAL</span>
                            </div>

                            <div className="flex items-center gap-2 mb-8 h-10">
                                <div className="flex -space-x-3 overflow-hidden">
                                    {data.customers.slice(0, 5).map((customer: any) => (
                                        <div key={customer.id} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden relative shrink-0 shadow-sm hover:z-10 hover:scale-110 transition-all cursor-pointer">
                                            <Image src={customer.image} alt={customer.name} fill className="object-cover" />
                                        </div>
                                    ))}
                                    {data.customers.length > 5 && (
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-900 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-sm">
                                            +{data.customers.length - 5}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-2">
                                    <p className="text-[10px] font-black uppercase tracking-tight text-neutral-400">Latest joiner</p>
                                    <p className="text-[11px] font-black text-neutral-900">{data.customers[0]?.name}</p>
                                </div>
                            </div>

                            <Link href="/dashboard/customers">
                                <button className="w-full flex items-center justify-between group">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">Customer Directory</span>
                                    <ChevronRight size={16} className="text-neutral-300 group-hover:text-maza-orange transition-all group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Quick View Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-[3rem] p-8 md:p-12 z-[101] shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="absolute top-8 right-8 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <span className="text-maza-orange font-black uppercase tracking-[0.2em] text-[10px]">Instant Fulfillment</span>
                            <h3 className="text-4xl font-black mt-4 mb-8">INVOICE <span className="text-neutral-200">{selectedOrder.id}</span></h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6 p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100 shadow-inner">
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-neutral-400 tracking-[0.2em] mb-1">Entity</p>
                                        <p className="font-black text-lg truncate">{selectedOrder.customer}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-neutral-400 tracking-[0.2em] mb-1">Gross Amount</p>
                                        <p className="text-2xl font-black text-maza-orange tracking-tighter">${selectedOrder.amount}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">Update Life Cycle</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Pending", "Shipped", "Delivered"].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                                                className={cn(
                                                    "py-4 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all shadow-sm",
                                                    selectedOrder.status === status
                                                        ? "bg-black text-white shadow-xl shadow-black/20"
                                                        : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
                                                )}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 border-t flex gap-4">
                                    <Link href="/dashboard/orders" className="flex-1">
                                        <button className="w-full bg-neutral-100 text-neutral-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
                                            <History size={16} /> Audit Trail
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="flex-1 bg-neutral-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-maza-orange transition-all shadow-lg shadow-black/10"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
