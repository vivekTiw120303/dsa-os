"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Sheets",
            href: "/sheets",
            icon: FileText,
        },
    ];

    const isActive = (href: string) => {
        if (href === "/sheets") {
            return pathname === "/sheets" || pathname.startsWith("/sheets/");
        }
        return pathname === href;
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r border-white/5 bg-black">
            {/* Logo / Brand */}
            <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white to-zinc-400 shadow-lg">
                    <span className="text-lg font-bold text-black">DS</span>
                </div>
                <div>
                    <h1 className="text-base font-bold tracking-tight text-white">
                        DSA OS
                    </h1>
                    <p className="text-xs text-zinc-500">Beast Mode</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                ${active
                                    ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
                                }
              `}
                        >
                            <Icon
                                className={`h-5 w-5 transition-colors ${active ? "text-white" : "text-zinc-500 group-hover:text-white"
                                    }`}
                            />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="border-t border-white/5 p-4">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-semibold text-white shadow-lg ring-2 ring-white/10">
                        VT
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                            Vivek Tiwari
                        </p>
                        <p className="text-xs text-zinc-500">Pro Member</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
