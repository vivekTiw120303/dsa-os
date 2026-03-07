"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@/components/providers/progress-provider";

interface StepProgressStatsProps {
    problemIds: string[];
}

export function StepProgressStats({ problemIds }: StepProgressStatsProps) {
    const { problemStatuses } = useProgress();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-2 animate-pulse min-w-[100px] justify-end">
                <div className="h-[22px] w-20 bg-muted/40 rounded-full"></div>
            </div>
        );
    }

    const totalProblems = problemIds.length;
    // Count only problems explicitly marked "done"
    const solvedProblems = problemIds.filter(id => problemStatuses[id] === "done").length;

    // Optional: add a slight green tint if 100% complete
    const isCompleted = solvedProblems === totalProblems && totalProblems > 0;

    return (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 ${isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted/30 text-muted-foreground'}`}>
            <span>{solvedProblems} / {totalProblems}</span>
            <span className="opacity-70">Solved</span>
        </div>
    );
}
