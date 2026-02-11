"use client";

import { useState, useEffect } from "react";
import { getStoreData, addProduct, deleteProduct as storeDeleteProduct } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    MoreVertical,
    Trash2,
    Edit3,
    ExternalLink,
    Filter
} from "lucide-react";
import Image from "next/image";

export default function ProductsManagementPage() {
    const [flavors, setFlavors] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [mounted, setMounted] = useState(false);

    // Form State for adding new products
    const [newFlavor, setNewFlavor] = useState({
        name: "",
        price: "",
        description: "",
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2127fd?q=80&w=400"
    });

    useEffect(() => {
        setFlavors(getStoreData().flavors);
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredFlavors = flavors.filter((f: any) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteFlavor = (id: string) => {
        const updated = storeDeleteProduct(id);
        setFlavors(updated);
    };

    const handleAddFlavor = () => {
        if (!newFlavor.name || !newFlavor.price) return;

        const flavor = {
            id: newFlavor.name.toLowerCase().replace(/\s+/g, '-'),
            name: newFlavor.name,
            price: parseFloat(newFlavor.price),
            description: newFlavor.description,
            image: newFlavor.image,
            fullDetails: newFlavor.description,
            color: "#FFB800",
            secondaryColor: "#FF7A00"
        };

        const updated = addProduct(flavor);
        setFlavors(updated);
        setIsAdding(false);
        setNewFlavor({ name: "", price: "", description: "", image: "https://images.unsplash.com/photo-1622597467836-f3285f2127fd?q=80&w=400" });
    };

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-black">Flavors <span className="text-maza-orange">Management.</span></h1>
                        <p className="text-neutral-500 text-sm">Update prices, stock levels, and add new juice varieties.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border rounded-2xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-maza-orange transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full sm:w-auto bg-neutral-900 text-white px-6 py-2 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-maza-orange transition-all shadow-lg shadow-black/5"
                        >
                            <Plus size={18} /> New Product
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-neutral-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 whitespace-nowrap">
                            <button className="text-sm font-bold border-b-2 border-maza-orange pb-1 shrink-0">All Products ({flavors.length})</button>
                            <button className="text-sm font-bold text-neutral-400 pb-1 shrink-0">In Stock</button>
                            <button className="text-sm font-bold text-neutral-400 pb-1 shrink-0">Low Stock</button>
                        </div>
                        <button className="w-max p-2 bg-neutral-50 rounded-xl text-neutral-400">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="overflow-x-auto -mx-4 md:mx-0">
                        <div className="min-w-[600px] px-4 md:px-0">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-neutral-400 text-xs border-b uppercase tracking-widest">
                                        <th className="pb-4 pt-2 font-bold pl-2">Product</th>
                                        <th className="pb-4 pt-2 font-bold">Price</th>
                                        <th className="pb-4 pt-2 font-bold">Category</th>
                                        <th className="pb-4 pt-2 font-bold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredFlavors.map((flavor: any) => (
                                            <motion.tr
                                                key={flavor.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="border-b last:border-0 hover:bg-neutral-50 transition-colors group"
                                            >
                                                <td className="py-4 pl-2">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center p-2 relative overflow-hidden shrink-0">
                                                            <Image src={flavor.image} alt={flavor.name} fill className="object-contain p-1" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm tracking-tight">{flavor.name}</p>
                                                            <p className="text-[10px] text-neutral-400 font-medium">Updated 2 days ago</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="font-black text-sm">${flavor.price}</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="bg-neutral-100 px-3 py-1 rounded-full text-[10px] font-bold text-neutral-500">Tropical Juice</span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="p-2 text-neutral-300 hover:text-maza-orange hover:bg-maza-orange/10 rounded-lg transition-all">
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteFlavor(flavor.id)}
                                                            className="p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <button className="p-2 text-neutral-300 hover:text-black hover:bg-neutral-100 rounded-lg transition-all">
                                                            <ExternalLink size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Product Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAdding(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white w-full max-w-lg rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-black mb-6 md:mb-8">Add <span className="text-maza-orange">New Flavor.</span></h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Flavor Name</label>
                                        <input
                                            type="text"
                                            value={newFlavor.name}
                                            onChange={(e) => setNewFlavor({ ...newFlavor, name: e.target.value })}
                                            className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-maza-orange outline-none"
                                            placeholder="e.g. Tropical Kiwi"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Price ($)</label>
                                        <input
                                            type="number"
                                            value={newFlavor.price}
                                            onChange={(e) => setNewFlavor({ ...newFlavor, price: e.target.value })}
                                            className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-maza-orange outline-none"
                                            placeholder="12.99"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Description</label>
                                    <textarea
                                        value={newFlavor.description}
                                        onChange={(e) => setNewFlavor({ ...newFlavor, description: e.target.value })}
                                        className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-maza-orange outline-none resize-none"
                                        rows={3}
                                        placeholder="Describe the taste profile..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Product Image URL</label>
                                    <input
                                        type="text"
                                        value={newFlavor.image}
                                        onChange={(e) => setNewFlavor({ ...newFlavor, image: e.target.value })}
                                        className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-maza-orange outline-none"
                                        placeholder="https://unsplash..."
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button onClick={() => setIsAdding(false)} className="flex-1 bg-neutral-100 text-neutral-500 font-bold py-4 rounded-2xl hover:bg-neutral-200 transition-all">Cancel</button>
                                    <button onClick={handleAddFlavor} className="flex-1 bg-maza-orange text-white font-bold py-4 rounded-2xl hover:bg-maza-orange/90 transition-all shadow-lg shadow-maza-orange/20">Add Flavor</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
