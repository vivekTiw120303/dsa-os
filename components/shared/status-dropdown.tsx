"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Check, RefreshCcw, ChevronDown, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProblemStatus } from "@/components/providers/progress-provider";

interface StatusDropdownProps {
    currentStatus: ProblemStatus | string;
    onStatusChange: (status: ProblemStatus) => void;
    problemName: string;
}

export function StatusDropdown({ currentStatus, onStatusChange, problemName }: StatusDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
            });
        }
        setIsOpen(!isOpen);
    };

    const handleSelect = (status: ProblemStatus, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onStatusChange(status);
        setIsOpen(false);
    };

    // Close on click outside or escape
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: globalThis.MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        const handleScroll = () => {
            // Optional: Close on scroll, or recalculate position. Closing is safer to prevent detachment.
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    const getStatusProps = (status: string) => {
        switch (status) {
            case "done":
            case "solved":
                return {
                    icon: <Check strokeWidth={3} className="h-3.5 w-3.5" />,
                    color: "text-emerald-500",
                    bg: "bg-emerald-500/10",
                    label: "Done"
                };
            case "revise":
                return {
                    icon: <RefreshCcw strokeWidth={2.5} className="h-3.5 w-3.5" />,
                    color: "text-amber-500",
                    bg: "bg-amber-500/10",
                    label: "Revise"
                };
            default: // pending
                return {
                    icon: <div className="h-3 w-3 rounded-[3px] border-[1.5px] border-current opacity-70" />,
                    color: "text-muted-foreground",
                    bg: "bg-muted/30",
                    label: "Pending"
                };
        }
    };

    const currentProps = getStatusProps(currentStatus);

    const dropdownMenu = isOpen ? createPortal(
        <div
            className="absolute z-[100] flex flex-col w-36 py-1 bg-background/95 backdrop-blur-xl border border-border/40 rounded-lg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-100 origin-top-left overflow-hidden"
            style={{ top: coords.top, left: coords.left }}
            onClick={(e) => e.stopPropagation()} // Prevent row click
        >
            <div className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase border-b border-border/20 mb-1">
                Status
            </div>

            <button
                onClick={(e) => handleSelect("done", e)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground/80 hover:text-foreground hover:bg-emerald-500/10 transition-colors w-full text-left"
            >
                <Check strokeWidth={3} className="h-3.5 w-3.5 text-emerald-500" />
                <span>Done</span>
            </button>
            <button
                onClick={(e) => handleSelect("revise", e)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground/80 hover:text-foreground hover:bg-amber-500/10 transition-colors w-full text-left"
            >
                <RefreshCcw strokeWidth={2.5} className="h-3.5 w-3.5 text-amber-500" />
                <span>Revise</span>
            </button>
            <button
                onClick={(e) => handleSelect("pending", e)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground/80 hover:text-foreground hover:bg-muted/30 transition-colors w-full text-left"
            >
                <div className="h-3 w-3 rounded-[3px] border-[1.5px] border-muted-foreground opacity-70 ml-[1px]" />
                <span className="ml-[1px]">Pending</span>
            </button>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className={cn(
                    "flex items-center gap-1.5 h-6 px-1.5 rounded transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shrink-0",
                    "hover:bg-muted/40",
                    currentProps.color
                )}
                aria-label={`Current status: ${currentProps.label}. Click to change.`}
            >
                <div className="h-5 w-5 flex items-center justify-center">
                    {currentProps.icon}
                </div>
                <ChevronDown className="h-3 w-3 opacity-50" />
            </button>
            {dropdownMenu}
        </>
    );
}
