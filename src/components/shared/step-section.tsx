"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ProblemRow } from "./problem-row";
import { ProblemStatus, ProgressState, DifficultyRating } from "@/src/hooks/use-progress";

interface Problem {
    id: string;
    name: string;
    tufUrl?: string;
    leetcodeUrl: string;
}

interface StepSectionProps {
    stepName: string;
    problems: Problem[];
    progressState: ProgressState;
    cycleStatus: (id: string) => void;
    markSolved?: (id: string, rating: DifficultyRating) => void;
    searchQuery?: string;
    defaultExpanded?: boolean;
}

export function StepSection({
    stepName,
    problems,
    progressState,
    cycleStatus,
    markSolved,
    searchQuery = "",
    defaultExpanded = false,
}: StepSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    // Filter problems based on search query
    const filteredProblems = searchQuery
        ? problems.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : problems;

    // If no matches after filtering, don't render this section
    if (filteredProblems.length === 0) {
        return null;
    }

    // Calculate progress
    const total = problems.length;
    const solvedCount = problems.filter(
        (p) =>
            progressState[p.id]?.status === "solved" ||
            progressState[p.id]?.status === "review"
    ).length;
    const percentage = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

    return (
        <div className="mb-8">
            {/* Sticky Header with Progress Bar - Now Clickable */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="sticky top-0 z-20 w-full backdrop-blur-xl bg-black/60 border-b border-white/5 -mx-4 px-4 py-4 mb-4 transition-all hover:bg-black/70 group"
            >
                <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                        {/* Collapse Icon */}
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 border border-white/10 transition-all group-hover:bg-white/10 group-hover:border-white/20">
                            {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-hover:text-white" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:text-white" />
                            )}
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight text-white text-left">
                            {stepName}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-zinc-400">
                            {solvedCount} / {total}
                        </span>
                        <span className="text-xs text-zinc-600">Solved</span>
                    </div>
                </div>

                {/* Mini Progress Bar */}
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/80">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </button>

            {/* Collapsible Problem List */}
            {isExpanded && (
                <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {filteredProblems.map((problem) => (
                        <ProblemRow
                            key={problem.id}
                            id={problem.id}
                            name={problem.name}
                            tufUrl={problem.tufUrl}
                            leetcodeUrl={problem.leetcodeUrl}
                            status={progressState[problem.id]?.status || "todo"}
                            onCycleStatus={cycleStatus}
                            onMarkSolved={markSolved}
                        />
                    ))}
                </div>
            )}

            {/* Collapsed State Indicator */}
            {!isExpanded && (
                <div className="flex items-center justify-center py-2 text-xs text-zinc-600">
                    <span>{filteredProblems.length} problems hidden</span>
                </div>
            )}
        </div>
    );
}
