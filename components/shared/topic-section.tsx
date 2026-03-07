"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicSectionProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

export function TopicSection({ title, children, defaultExpanded = true }: TopicSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="flex flex-col mb-10 w-full animate-in fade-in duration-500">
            {/* Minimalist Structured Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-3 w-full py-2 hover:opacity-80 transition-opacity focus:outline-none"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center justify-center h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
                <h3 className="text-[15px] font-semibold tracking-wide text-foreground uppercase shrink-0">
                    {title}
                </h3>
                {/* Visual Separator Line - Fills remaining space */}
                <div className="flex-1 h-[1px] bg-border/40 mt-[2px]"></div>
            </button>

            {/* Collapsible Content wrapper */}
            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out pl-[9px]",
                    isExpanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col border-l border-border/20 py-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
