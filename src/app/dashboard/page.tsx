"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Bell
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { getStoreData } from "@/lib/store";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setData(getStoreData());
        setMounted(true);
    }, []);

    if (!data || !mounted) return null;

    // Deterministic random for stock level based on ID
    const getStockLevel = (id: string) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash % 70) + 20; // 20-90%
    };

    const totalRevenue = data.orders.reduce((acc: number, o: any) => acc + (typeof o.amount === 'string' ? parseFloat(o.amount.replace('$', '')) : o.amount), 0);
    const totalOrders = data.orders.length;
    const activeCustomers = data.customers.length;
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    const stats = [
        { name: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, trend: "+12.5%", isPositive: true },
        { name: "Total Orders", value: totalOrders.toString(), icon: ShoppingBag, trend: "+5.4%", isPositive: true },
        { name: "Active Customers", value: activeCustomers.toString(), icon: Users, trend: "-2.1%", isPositive: false },
        { name: "Avg. Order Value", value: `$${avgOrderValue}`, icon: TrendingUp, trend: "+8.2%", isPositive: true },
    ];

    const recentOrders = data.orders.slice(0, 4);

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black">Admin <span className="text-maza-orange">Panel.</span></h1>
                        <p className="text-neutral-500 text-xs md:text-sm">Welcome back! Today is {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <button className="p-2 bg-white rounded-xl border shadow-sm text-neutral-400 hover:text-black transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-maza-orange rounded-full border-2 border-white" />
                        </button>
                        <div className="flex items-center gap-2 md:gap-3 bg-white p-1 pr-3 md:pr-4 border rounded-full shadow-sm">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-maza-orange overflow-hidden relative shrink-0">
                                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" alt="Admin" fill className="object-cover" />
                            </div>
                            <span className="text-xs md:text-sm font-bold truncate max-w-[80px] md:max-w-none">Aditya Verma</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-neutral-100 group hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2.5 md:p-3 bg-neutral-50 rounded-xl md:rounded-2xl group-hover:bg-maza-orange group-hover:text-white transition-colors">
                                    <stat.icon size={24} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg",
                                    stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                )}>
                                    {stat.trend} {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                </div>
                            </div>
                            <p className="text-neutral-400 text-xs md:text-sm font-medium">{stat.name}</p>
                            <h3 className="text-xl md:text-2xl font-black mt-1">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-sm border border-neutral-100 overflow-hidden">
                        <div className="flex items-center justify-between mb-6 md:mb-8">
                            <h3 className="text-lg md:text-xl font-bold">Recent Orders</h3>
                            <Link href="/dashboard/orders">
                                <button className="text-xs md:text-sm font-bold text-maza-orange hover:underline">View All</button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto -mx-5 md:mx-0">
                            <div className="min-w-[600px] px-5 md:px-0">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-neutral-400 text-[10px] md:text-sm border-b uppercase tracking-wider">
                                            <th className="pb-4 font-bold">Order ID</th>
                                            <th className="pb-4 font-bold">Customer</th>
                                            <th className="pb-4 font-bold">Flavor</th>
                                            <th className="pb-4 font-bold">Amount</th>
                                            <th className="pb-4 font-bold text-center">Status</th>
                                            <th className="pb-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs md:text-sm">
                                        {recentOrders.map((order: any) => (
                                            <tr key={order.id} className="border-b last:border-0 hover:bg-neutral-50 transition-colors group">
                                                <td className="py-4 font-bold">{order.id}</td>
                                                <td className="py-4 font-medium">{order.customer}</td>
                                                <td className="py-4 font-bold text-maza-orange">{order.flavor}</td>
                                                <td className="py-4 font-black">{order.amount}</td>
                                                <td className="py-4">
                                                    <div className={cn(
                                                        "mx-auto w-max px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase text-center",
                                                        order.status === "Delivered" ? "bg-green-100 text-green-600" :
                                                            order.status === "In Transit" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"
                                                    )}>
                                                        {order.status}
                                                    </div>
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    <button className="text-neutral-300 hover:text-black transition-colors">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions / Dynamic Stats */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="bg-maza-orange text-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-lg shadow-maza-orange/30">
                            <h3 className="text-lg md:text-xl font-bold mb-4">Stock Overview</h3>
                            <div className="space-y-5 md:space-y-6">
                                {data.flavors.slice(0, 3).map((flavor: any) => {
                                    const stockLevel = getStockLevel(flavor.id);
                                    return (
                                        <div key={flavor.id}>
                                            <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase mb-2">
                                                <span className="truncate max-w-[150px]">{flavor.name}</span>
                                                <span>{stockLevel}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${stockLevel}%` }}
                                                    className={cn("h-full bg-white", stockLevel < 20 ? "bg-red-400" : "")}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <Link href="/dashboard/products">
                                <button className="w-full mt-6 md:mt-8 bg-black text-white py-3 rounded-xl text-xs md:text-sm font-bold hover:bg-neutral-900 transition-all">
                                    Manage Inventory
                                </button>
                            </Link>
                        </div>

                        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-neutral-100 shadow-sm">
                            <div className="flex items-center gap-3 md:gap-4 mb-6">
                                <div className="p-2.5 md:p-3 bg-neutral-100 rounded-xl md:rounded-2xl shrink-0">
                                    <Users size={24} className="text-neutral-900" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm md:text-base">Latest Customers</h4>
                                    <p className="text-[10px] md:text-xs text-neutral-400">Total {data.customers.length} registered</p>
                                </div>
                            </div>
                            <div className="flex -space-x-2.5 md:-space-x-3 overflow-hidden">
                                {data.customers.slice(0, 5).map((customer: any) => (
                                    <div key={customer.id} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden relative shrink-0">
                                        <Image src={customer.image} alt={customer.name} fill className="object-cover" />
                                    </div>
                                ))}
                                {data.customers.length > 5 && (
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-maza-orange text-white flex items-center justify-center text-[10px] md:text-xs font-bold italic shrink-0">
                                        +{data.customers.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
