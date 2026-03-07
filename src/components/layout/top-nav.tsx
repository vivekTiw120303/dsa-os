"use client";

import { Search } from "lucide-react";

interface TopNavProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function TopNav({ searchQuery, setSearchQuery }: TopNavProps) {
    return (
        <div className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white to-zinc-400 shadow-lg">
                            <span className="text-sm font-bold text-black">DS</span>
                        </div>
                        <div className="hidden sm:block">
                            <h2 className="text-sm font-semibold tracking-tight text-white">
                                DSA OS
                            </h2>
                            <p className="text-xs text-zinc-500">Beast Mode</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-zinc-500" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search problems..."
                            className="block w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-20 text-sm text-white placeholder:text-zinc-500 focus:border-white/20 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
                                <span className="text-xs">Ctrl</span>K
                            </kbd>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-medium text-white">Vivek Tiwari</p>
                            <p className="text-xs text-zinc-500">Pro Member</p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-semibold text-white shadow-lg ring-2 ring-white/10">
                            VT
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
