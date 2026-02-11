"use client";

import {
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle,
    Truck,
    Clock,
    MoreVertical,
    X,
    Trash2,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStoreData, updateOrderStatus, saveStoreData } from "@/lib/store";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

    useEffect(() => {
        const data = getStoreData().orders;
        setOrders(data);
        setFilteredOrders(data);
        setMounted(true);
    }, []);

    useEffect(() => {
        let result = orders;

        // Filter by Tab
        if (activeTab !== "All") {
            result = result.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());
        }

        // Filter by Search
        if (searchTerm) {
            result = result.filter(o =>
                o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.customer.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredOrders(result);
    }, [searchTerm, activeTab, orders]);

    const handleStatusUpdate = (id: string, newStatus: string) => {
        const updated = updateOrderStatus(id, newStatus);
        setOrders(updated);
        if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status: newStatus });
        toast.success(`Order ${id} marked as ${newStatus}`);
    };

    const handleDelete = (id: string) => {
        const remaining = orders.filter(o => o.id !== id);
        saveStoreData({ orders: remaining });
        setOrders(remaining);
        setSelectedOrder(null);
        toast.success("Order deleted");
    };

    const handleBulkDelete = () => {
        const remaining = orders.filter(o => !selectedOrderIds.includes(o.id));
        saveStoreData({ orders: remaining });
        setOrders(remaining);
        setSelectedOrderIds([]);
        toast.success(`${selectedOrderIds.length} orders deleted`);
    };

    const handleExport = () => {
        const headers = ["Order ID", "Date", "Customer", "Items", "Amount", "Status"];
        const csvContent = [
            headers.join(","),
            ...filteredOrders.map(o => `${o.id},${o.date},"${o.customer}",${o.items},${o.amount},${o.status}`)
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `maza_orders_${new Date().toLocaleDateString()}.csv`);
        link.click();
        toast.success("Exporting orders...");
    };

    const toggleSelect = (id: string) => {
        setSelectedOrderIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    if (!mounted) return null;

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-black">Orders <span className="text-maza-orange">Tracking.</span></h1>
                        <p className="text-neutral-500 text-sm">Manage customer orders, track shipments, and handle returns.</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={handleExport}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border rounded-2xl bg-white text-sm font-bold hover:bg-neutral-50 transition-all shadow-sm"
                        >
                            <Download size={18} /> Export
                        </button>
                        {selectedOrderIds.length > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="flex-1 md:flex-none bg-red-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                            >
                                <Trash2 size={18} /> Delete ({selectedOrderIds.length})
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-neutral-100 mb-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
                        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-2xl w-full lg:w-auto overflow-x-auto custom-scrollbar">
                            {["All", "Pending", "Shipped", "Delivered"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0",
                                        activeTab === tab ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-neutral-600"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                            <input
                                type="text"
                                placeholder="Search by ID or customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-neutral-50 border-none rounded-[1.25rem] pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-maza-orange transition-all placeholder:text-neutral-300 shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto -mx-6 md:mx-0">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-neutral-400 text-[10px] border-b uppercase tracking-widest font-black">
                                    <th className="pb-4 pt-2 pl-6">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedOrderIds(filteredOrders.map(o => o.id));
                                                else setSelectedOrderIds([]);
                                            }}
                                            className="rounded border-neutral-300 text-maza-orange focus:ring-maza-orange"
                                        />
                                    </th>
                                    <th className="pb-4 pt-2">Order ID</th>
                                    <th className="pb-4 pt-2">Date</th>
                                    <th className="pb-4 pt-2">Customer</th>
                                    <th className="pb-4 pt-2">Status</th>
                                    <th className="pb-4 pt-2 text-center">Amount</th>
                                    <th className="pb-4 pt-2 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <AnimatePresence mode="popLayout">
                                    {filteredOrders.map((order) => (
                                        <motion.tr
                                            key={order.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="border-b last:border-0 hover:bg-neutral-50/50 transition-colors group"
                                        >
                                            <td className="py-5 pl-6">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrderIds.includes(order.id)}
                                                    onChange={() => toggleSelect(order.id)}
                                                    className="rounded border-neutral-300 text-maza-orange focus:ring-maza-orange"
                                                />
                                            </td>
                                            <td className="py-5 font-black text-neutral-900">{order.id}</td>
                                            <td className="py-5 text-neutral-400 font-bold">{order.date}</td>
                                            <td className="py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-neutral-800">{order.customer}</span>
                                                    <span className="text-[10px] text-neutral-400 font-bold">{order.items} cartons ordered</span>
                                                </div>
                                            </td>
                                            <td className="py-5">
                                                <div className={cn(
                                                    "flex items-center gap-1.5 w-max px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight",
                                                    order.status === "Delivered" ? "bg-green-50 text-green-600" :
                                                        order.status === "Shipped" ? "bg-blue-50 text-blue-600" :
                                                            order.status === "Cancelled" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
                                                )}>
                                                    {order.status === "Delivered" && <CheckCircle size={10} />}
                                                    {order.status === "Shipped" && <Truck size={10} />}
                                                    {order.status === "Pending" && <Clock size={10} />}
                                                    {order.status}
                                                </div>
                                            </td>
                                            <td className="py-5 font-black text-center text-maza-orange text-lg">${order.amount}</td>
                                            <td className="py-5 text-right pr-6">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 bg-neutral-100 rounded-xl text-neutral-400 hover:text-black hover:bg-white hover:shadow-sm transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-20 text-center text-neutral-400 font-bold">
                                            No orders found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Modal */}
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

                                <span className="text-maza-orange font-black uppercase tracking-[0.2em] text-xs">Order Details</span>
                                <h3 className="text-4xl font-black mt-4 mb-8">INVOICE <span className="text-neutral-300">{selectedOrder.id}</span></h3>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-8 p-6 bg-neutral-50 rounded-3xl">
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-1">Customer</p>
                                            <p className="font-black text-lg">{selectedOrder.customer}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-1">Date</p>
                                            <p className="font-bold">{selectedOrder.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-1">Total Items</p>
                                            <p className="font-bold">{selectedOrder.items} Cartons</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-1">Total Amount</p>
                                            <p className="text-2xl font-black text-maza-orange">${selectedOrder.amount}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase font-black text-neutral-400 tracking-widest mb-4">Update Status</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            {["Pending", "Shipped", "Delivered"].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                                                    className={cn(
                                                        "py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
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
                                        <button
                                            onClick={() => handleDelete(selectedOrder.id)}
                                            className="flex-1 bg-red-50 text-red-500 py-4 rounded-2xl font-black text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={18} /> Cancel Order
                                        </button>
                                        <button
                                            onClick={() => setSelectedOrder(null)}
                                            className="flex-1 bg-neutral-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-black transition-all"
                                        >
                                            Done
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
