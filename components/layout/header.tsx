"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useSidebar } from "./sidebar-provider";

export function Header() {
    const { toggle } = useSidebar();

    return (
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b border-border/20 bg-[#0B0B0B] px-4 md:px-6 transition-all">
            <div className="flex flex-1 items-center gap-4">
                <button
                    onClick={toggle}
                    className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div className="relative w-full max-w-sm hidden sm:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search problems or sheets..."
                        className="h-8 w-full rounded-md border border-border/30 bg-secondary/20 pl-9 pr-14 text-[13px] outline-none placeholder:text-muted-foreground/50 focus:border-border/60 focus:bg-secondary/40 transition-all duration-150 block"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-muted/40 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 transition-opacity">
                            <span className="text-[11px]">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative rounded-md p-1.5 text-muted-foreground/80 hover:bg-secondary/40 hover:text-foreground transition-all duration-150">
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <Bell className="h-4 w-4" />
                </button>
            </div>
        </header>
    );
}
