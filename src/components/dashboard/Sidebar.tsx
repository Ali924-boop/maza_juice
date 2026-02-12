"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Orders", icon: ShoppingBag, href: "/dashboard/orders" },
    { name: "Products", icon: Package, href: "/dashboard/products" },
    { name: "Customers", icon: Users, href: "/dashboard/customers" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function DashboardSidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [profile, setProfile] = useState({
        name: "Aditya Verma",
        role: "Administrator",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100"
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem("maza_admin_profile");
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, [pathname]); // Reload when moving between pages

    const handleLogout = () => {
        localStorage.removeItem("maza_admin_auth");
        router.push("/admin/login");
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity lg:hidden",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={() => setIsOpen(false)}
            />

            <aside className={cn(
                "fixed top-0 left-0 z-50 w-64 bg-white border-r h-screen overflow-y-auto flex flex-col transition-transform duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-8 border-b flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                        <span className="text-maza-orange">MAZA</span>
                        <span className="text-maza-yellow text-xs px-2 py-0.5 bg-neutral-100 rounded-full">ADMIN</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-neutral-400 hover:text-black"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 pt-8">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-xl transition-all group",
                                    isActive
                                        ? "bg-maza-orange text-white shadow-lg shadow-maza-orange/20"
                                        : "text-neutral-500 hover:bg-neutral-50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} />
                                    <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                </div>
                                {isActive && <ChevronRight size={14} />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t space-y-4">
                    <Link
                        href="/dashboard/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-neutral-200 overflow-hidden relative shadow-inner border-2 border-white">
                            <img
                                src={profile.image}
                                alt="Admin"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-black text-xs truncate uppercase tracking-tight">{profile.name}</p>
                            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">{profile.role}</p>
                        </div>
                        <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm text-neutral-300 group-hover:text-maza-orange transition-colors">
                            <ChevronRight size={14} />
                        </div>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-neutral-400 hover:text-red-500 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-neutral-50 group-hover:bg-red-50 transition-colors">
                            <LogOut size={18} />
                        </div>
                        <span className="font-bold text-sm tracking-tight">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
