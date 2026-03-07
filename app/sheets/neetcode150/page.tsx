"use client";

import { useState, useEffect } from "react";
import problemsData from "@/src/data/neetcode150.json";
import { StepSection } from "@/components/shared/step-section";
import { TopNav } from "@/src/components/layout/top-nav";
import { useProgress } from "@/src/hooks/use-progress";
import { Trophy } from "lucide-react";

interface Problem {
    id: string;
    sheet: string;
    step: string;
    topic: string;
    name: string;
    difficulty: string;
    leetcodeUrl: string;
    type?: "code" | "video" | "article";
}

export default function NeetCode150Page() {
    const [searchQuery, setSearchQuery] = useState("");
    const { progressState, cycleStatus, markSolved, getTotalProgress, isHydrated } = useProgress();

    const problems = problemsData as Problem[];

    // Group problems by step
    const groupedByStep = problems.reduce((acc, problem) => {
        if (!acc[problem.step]) {
            acc[problem.step] = [];
        }
        acc[problem.step].push(problem);
        return acc;
    }, {} as Record<string, Problem[]>);

    // Calculate total progress
    const { solved, total, percentage } = getTotalProgress(problems);

    // Keyboard shortcut for search (Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black">
            {/* Top Navigation */}
            <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Radial gradient background glow */}
            <div className="absolute inset-x-0 top-0 h-[500px] w-full bg-gradient-radial from-white/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 z-10">
                {/* Hero Section */}
                <div className="mb-16 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-300 w-fit backdrop-blur-sm shadow-lg transition-all hover:bg-zinc-800/50 hover:border-white/20">
                            <Trophy className="h-3.5 w-3.5 text-amber-400" />
                            <span className="tracking-wide">NeetCode 150</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl leading-tight">
                            Expanded Algorithmic
                            <br />
                            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                Patterns for Deep Mastery
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl text-zinc-400 text-base leading-relaxed">
                            An extended collection of 150 problems covering all essential patterns and techniques needed to excel in coding interviews.
                        </p>
                    </div>

                    {/* Massive Progress Bar */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-white">
                                    {percentage}%
                                </span>
                                <span className="text-sm text-zinc-500">Complete</span>
                            </div>
                            <div className="text-sm font-medium text-zinc-400">
                                {solved} / {total} Problems
                            </div>
                        </div>

                        {/* Glowing Progress Bar */}
                        <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-800 shadow-inner">
                            <div
                                className="h-full rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-700 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Step Sections */}
                {!isHydrated ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {Object.entries(groupedByStep).map(([stepName, stepProblems]) => (
                            <StepSection
                                key={stepName}
                                stepName={stepName}
                                problems={stepProblems}
                                progressState={progressState}
                                cycleStatus={cycleStatus}
                                markSolved={markSolved}
                                searchQuery={searchQuery}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State for Search */}
                {isHydrated && searchQuery && Object.entries(groupedByStep).every(
                    ([_, stepProblems]) =>
                        stepProblems.filter((p) =>
                            p.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length === 0
                ) && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-white/10">
                                <Trophy className="h-8 w-8 text-zinc-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                No problems found
                            </h3>
                            <p className="text-sm text-zinc-500 max-w-sm">
                                Try adjusting your search query or clear the search to see all problems.
                            </p>
                        </div>
                    )}
            </div>
        </div>
    );
}
