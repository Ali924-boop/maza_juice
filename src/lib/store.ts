"use client";

import { Flavor, flavors as initialFlavors } from "@/data/flavors";

// Initial Mock Data
const initialOrders = [
    { id: "#MZ-8821", date: "Feb 11, 2026", customer: "Amir Khan", flavor: "Classic Mango", status: "Delivered", amount: 31.98, items: 2 },
    { id: "#MZ-8822", date: "Feb 11, 2026", customer: "Priya Sharma", flavor: "Pink Guava", status: "Shipped", amount: 16.99, items: 1 },
    { id: "#MZ-8823", date: "Feb 10, 2026", customer: "John Doe", flavor: "Mixed Fruit Bliss", status: "Pending", amount: 56.97, items: 3 },
    { id: "#MZ-8824", date: "Feb 10, 2026", customer: "Sana Malik", flavor: "Luscious Litchi", status: "Delivered", amount: 17.99, items: 1 },
    { id: "#MZ-8825", date: "Feb 09, 2026", customer: "Rahul Gupta", flavor: "Classic Mango", status: "Cancelled", amount: 15.99, items: 1 },
    { id: "#MZ-8826", date: "Feb 09, 2026", customer: "Elena Smith", flavor: "Pink Guava", status: "Delivered", amount: 33.98, items: 2 },
];

const initialCustomers = [
    { id: 1, name: "Amir Khan", email: "amir.k@example.com", location: "Karachi, PK", orders: 12, spent: 1240.00, image: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Priya Sharma", email: "priya.s@example.com", location: "Mumbai, IN", orders: 5, spent: 450.50, image: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "John Doe", email: "j.doe@example.com", location: "London, UK", orders: 24, spent: 3890.10, image: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Sana Malik", email: "sana.m@example.com", location: "Dubai, UAE", orders: 8, spent: 980.00, image: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Rahul Gupta", email: "rahul.g@example.com", location: "Delhi, IN", orders: 3, spent: 210.00, image: "https://i.pravatar.cc/150?u=5" },
];

export const getStoreData = () => {
    if (typeof window === "undefined") return { flavors: initialFlavors, orders: initialOrders, customers: initialCustomers };

    const flavors = JSON.parse(localStorage.getItem("maza_flavors") || JSON.stringify(initialFlavors));
    const orders = JSON.parse(localStorage.getItem("maza_orders") || JSON.stringify(initialOrders));
    const customers = JSON.parse(localStorage.getItem("maza_customers") || JSON.stringify(initialCustomers));

    return { flavors, orders, customers };
};

export const saveStoreData = (data: { flavors?: any[], orders?: any[], customers?: any[] }) => {
    if (typeof window === "undefined") return;

    if (data.flavors) localStorage.setItem("maza_flavors", JSON.stringify(data.flavors));
    if (data.orders) localStorage.setItem("maza_orders", JSON.stringify(data.orders));
    if (data.customers) localStorage.setItem("maza_customers", JSON.stringify(data.customers));
};

export const updateOrderStatus = (orderId: string, status: string) => {
    const { orders } = getStoreData();
    const updatedOrders = orders.map((o: any) => o.id === orderId ? { ...o, status } : o);
    saveStoreData({ orders: updatedOrders });
    return updatedOrders;
};

export const deleteProduct = (id: string) => {
    const { flavors } = getStoreData();
    const updatedFlavors = flavors.filter((f: any) => f.id !== id);
    saveStoreData({ flavors: updatedFlavors });
    return updatedFlavors;
};

export const addProduct = (flavor: any) => {
    const { flavors } = getStoreData();
    const updatedFlavors = [flavor, ...flavors];
    saveStoreData({ flavors: updatedFlavors });
    return updatedFlavors;
};

export const updateProduct = (flavor: any) => {
    const { flavors } = getStoreData();
    const updatedFlavors = flavors.map((f: any) => f.id === flavor.id ? flavor : f);
    saveStoreData({ flavors: updatedFlavors });
    return updatedFlavors;
};
