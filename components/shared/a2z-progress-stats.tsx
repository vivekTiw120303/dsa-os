"use client";

import { Target } from "lucide-react";
import { useProgress } from "@/components/providers/progress-provider";
import { useEffect, useState } from "react";

interface A2ZProgressStatsProps {
    totalProblems: number;
}

export function A2ZProgressStats({ totalProblems }: A2ZProgressStatsProps) {
    const { problemStatuses } = useProgress();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="mt-4 flex w-full max-w-sm flex-col gap-2 p-1 animate-pulse opacity-50">
                <div className="flex items-center justify-between text-xs tracking-wide">
                    <span className="font-semibold uppercase tracking-widest text-muted-foreground">Progress</span>
                    <span className="font-mono text-muted-foreground/50">0 / {totalProblems}</span>
                </div>
                <div className="h-1.5 w-full bg-border/40 rounded-full mt-1"></div>
            </div>
        );
    }

    // Only count problems explicitly marked as "done" for the absolute progress stat
    const solvedProblems = Object.values(problemStatuses).filter(status => status === "done").length;
    const progressPercent = Math.round((solvedProblems / totalProblems) * 100) || 0;

    return (
        <div className="mt-4 flex w-full max-w-sm flex-col gap-2 p-1">
            <div className="flex items-center justify-between text-xs tracking-wide">
                <div className="flex items-center gap-1.5">
                    <Target className="h-3 w-3 text-emerald-500/80" />
                    <span className="font-semibold uppercase tracking-widest text-muted-foreground/80">Progress</span>
                </div>
                <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-foreground/90 font-medium">{solvedProblems}</span>
                    <span className="text-muted-foreground/50">/ {totalProblems} solved</span>
                </div>
            </div>

            {/* Ultra-Minimalist Progress Track */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40 mt-1">
                <div
                    className="h-full rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}
