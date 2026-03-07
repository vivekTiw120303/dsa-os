"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Library, AreaChart, Settings, X, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-provider";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Sheets", href: "/sheets/a2z", icon: Library },
    { name: "Progress", href: "/progress", icon: AreaChart },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isOpen, setIsOpen } = useSidebar();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-border/20 bg-[#0A0A0A] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-14 shrink-0 items-center justify-between px-6 border-b border-transparent">
                    <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
                        <div className="relative flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary border border-primary/20">
                            <TerminalSquare className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold tracking-wide text-foreground">
                            DSA<span className="text-muted-foreground font-normal">OS</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-6">
                    <div className="mb-2 px-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-2">
                        Workspace
                    </div>
                    {navigation.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150",
                                    isActive
                                        ? "text-foreground bg-secondary/50"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-4 w-4 shrink-0 transition-transform duration-150",
                                    isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground/80"
                                )} aria-hidden="true" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border/20 mt-auto">
                    <div className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/40 transition-colors cursor-pointer group">
                        <div className="h-7 w-7 rounded bg-secondary/80 flex items-center justify-center text-foreground text-xs font-semibold border border-border/40 group-hover:border-border/60 transition-colors">
                            V
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-foreground/90 text-xs">Vivek Tiwari</span>
                            <span className="text-[10px] text-muted-foreground">Pro Member</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
