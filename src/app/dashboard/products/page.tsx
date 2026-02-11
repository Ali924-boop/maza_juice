"use client";

import { useState, useEffect } from "react";
import {
    getStoreData,
    addProduct,
    updateProduct,
    deleteProduct as storeDeleteProduct,
    saveStoreData
} from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Trash2,
    Edit3,
    ExternalLink,
    Filter,
    X,
    Package,
    DollarSign,
    Layers,
    CheckCircle2,
    AlertCircle,
    ChevronRight
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProductsManagementPage() {
    const [flavors, setFlavors] = useState<any[]>([]);
    const [filteredFlavors, setFilteredFlavors] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [mounted, setMounted] = useState(false);

    // Form State for adding/editing products
    const initialFormState = {
        name: "",
        price: "",
        stock: 100,
        description: "",
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2127fd?q=80&w=400"
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        const data = getStoreData().flavors;
        // Ensure every product has a stock property for the UI
        const dataWithStock = data.map((f: any) => ({
            ...f,
            stock: f.stock || Math.floor(Math.random() * 200) + 50
        }));
        setFlavors(dataWithStock);
        setMounted(true);
    }, []);

    useEffect(() => {
        let result = flavors;

        // Filter by Tab
        if (activeFilter === "In Stock") {
            result = result.filter(f => f.stock > 20);
        } else if (activeFilter === "Low Stock") {
            result = result.filter(f => f.stock <= 20);
        }

        // Filter by Search
        if (searchTerm) {
            result = result.filter(f =>
                f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                f.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredFlavors(result);
    }, [searchTerm, activeFilter, flavors]);

    if (!mounted) return null;

    const deleteFlavor = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            const updated = storeDeleteProduct(id);
            setFlavors(updated);
            toast.success(`${name} removed from collection`);
        }
    };

    const handleSaveFlavor = () => {
        if (!formData.name || !formData.price) {
            toast.error("Please fill in all required fields");
            return;
        }

        const flavorData = {
            id: editingProduct ? editingProduct.id : formData.name.toLowerCase().replace(/\s+/g, '-'),
            name: formData.name,
            price: parseFloat(formData.price.toString()),
            stock: parseInt(formData.stock.toString()),
            description: formData.description,
            image: formData.image,
            fullDetails: formData.description,
            color: editingProduct?.color || "#FFB800",
            secondaryColor: editingProduct?.secondaryColor || "#FF7A00"
        };

        let updated;
        if (editingProduct) {
            updated = updateProduct(flavorData);
            toast.success("Product updated successfully");
        } else {
            updated = addProduct(flavorData);
            toast.success("New flavor added to collection");
        }

        setFlavors(updated);
        resetForm();
    };

    const resetForm = () => {
        setIsAdding(false);
        setEditingProduct(null);
        setFormData(initialFormState);
    };

    const startEditing = (flavor: any) => {
        setEditingProduct(flavor);
        setFormData({
            name: flavor.name,
            price: flavor.price,
            stock: flavor.stock,
            description: flavor.description,
            image: flavor.image
        });
        setIsAdding(true);
    };

    return (
        <div className="bg-neutral-50 min-h-screen font-sans">
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-black">Flavors <span className="text-maza-orange">Management.</span></h1>
                        <p className="text-neutral-500 text-sm">Control inventory, adjust pricing, and curate the Maza collection.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border-none rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-maza-orange transition-all shadow-sm"
                            />
                        </div>
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setFormData(initialFormState);
                                setIsAdding(true);
                            }}
                            className="w-full sm:w-auto bg-neutral-900 text-white px-8 py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-maza-orange transition-all shadow-xl shadow-black/5 active:scale-95"
                        >
                            <Plus size={18} /> Add Flavor
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-neutral-100 mb-20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
                            {["All", "In Stock", "Low Stock"].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={cn(
                                        "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0",
                                        activeFilter === filter ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-neutral-600"
                                    )}
                                >
                                    {filter} {filter === "All" && `(${flavors.length})`}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase font-black text-neutral-400 tracking-widest">Sort by: <span className="text-neutral-900">Recently Added</span></span>
                        </div>
                    </div>

                    <div className="overflow-x-auto -mx-6 md:mx-0">
                        <div className="min-w-[800px] px-6 md:px-0">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-neutral-400 text-[10px] border-b uppercase tracking-widest font-black">
                                        <th className="pb-4 pt-2 pl-4">Product Details</th>
                                        <th className="pb-4 pt-2 text-center">Price</th>
                                        <th className="pb-4 pt-2 text-center">Stock Level</th>
                                        <th className="pb-4 pt-2 text-center">Category</th>
                                        <th className="pb-4 pt-2 text-right pr-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {filteredFlavors.map((flavor: any) => (
                                            <motion.tr
                                                key={flavor.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="border-b last:border-0 hover:bg-neutral-50/50 transition-colors group"
                                            >
                                                <td className="py-5 pl-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-neutral-100 rounded-[1.25rem] flex items-center justify-center p-2 relative overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                                            <Image src={flavor.image} alt={flavor.name} fill className="object-contain p-1" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-neutral-900 leading-tight">{flavor.name}</p>
                                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">ID: {flavor.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-5 text-center">
                                                    <span className="font-black text-lg text-maza-orange">${flavor.price}</span>
                                                </td>
                                                <td className="py-5 text-center">
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${Math.min((flavor.stock / 200) * 100, 100)}%` }}
                                                                className={cn(
                                                                    "h-full rounded-full",
                                                                    flavor.stock <= 20 ? "bg-red-500" : flavor.stock <= 50 ? "bg-maza-yellow" : "bg-green-500"
                                                                )}
                                                            />
                                                        </div>
                                                        <span className={cn(
                                                            "text-[10px] font-black uppercase tracking-tight",
                                                            flavor.stock <= 20 ? "text-red-500" : "text-neutral-400"
                                                        )}>
                                                            {flavor.stock} in stock
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-5 text-center">
                                                    <span className="bg-neutral-100 px-3 py-1.5 rounded-full text-[9px] font-black text-neutral-500 uppercase tracking-widest">Tropical</span>
                                                </td>
                                                <td className="py-5 text-right pr-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/flavors/${flavor.id}`}
                                                            target="_blank"
                                                            className="p-2 text-neutral-300 hover:text-black hover:bg-neutral-100 rounded-xl transition-all"
                                                        >
                                                            <ExternalLink size={18} />
                                                        </Link>
                                                        <button
                                                            onClick={() => startEditing(flavor)}
                                                            className="p-2 text-neutral-300 hover:text-maza-orange hover:bg-maza-orange/10 rounded-xl transition-all"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteFlavor(flavor.id, flavor.name)}
                                                            className="p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                            {filteredFlavors.length === 0 && (
                                <div className="py-20 text-center">
                                    <Package size={40} className="mx-auto text-neutral-200 mb-4" />
                                    <p className="text-neutral-400 font-bold">No products found matching your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Product Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={resetForm}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <button
                                onClick={resetForm}
                                className="absolute top-8 right-8 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <span className="text-maza-orange font-black uppercase tracking-[0.2em] text-xs">Collection Editor</span>
                            <h2 className="text-4xl font-black mt-4 mb-10">
                                {editingProduct ? "EDIT" : "ADD NEW"} <span className="text-neutral-300">FLAVOR</span>
                            </h2>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Flavor Name</label>
                                        <div className="relative">
                                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none shadow-inner"
                                                placeholder="e.g. Tropical Kiwi"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Price Per Carton ($)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none shadow-inner"
                                                placeholder="15.99"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Initial Stock Level</label>
                                        <div className="relative">
                                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                            <input
                                                type="number"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                                className="w-full bg-neutral-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none shadow-inner"
                                                placeholder="100"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Preview Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full bg-neutral-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none shadow-inner"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Flavor Profile / Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-neutral-50 border-none rounded-3xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-maza-orange outline-none resize-none shadow-inner"
                                        rows={4}
                                        placeholder="Describe the aromatic notes and taste profile of this juice..."
                                    />
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button
                                        onClick={resetForm}
                                        className="flex-1 bg-neutral-100 text-neutral-400 font-black py-5 rounded-3xl hover:bg-neutral-200 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handleSaveFlavor}
                                        className="flex-1 bg-neutral-900 text-white font-black py-5 rounded-3xl hover:bg-maza-orange transition-all shadow-xl shadow-black/10 uppercase tracking-widest text-xs"
                                    >
                                        {editingProduct ? "Update Collection" : "Add to Collection"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
