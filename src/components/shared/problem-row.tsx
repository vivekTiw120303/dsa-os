"use client";

import { useState } from "react";
import { ExternalLink, Code2, Check, Eye, Play, BookOpen } from "lucide-react";
import { ProblemStatus, DifficultyRating } from "@/src/hooks/use-progress";
import { DifficultyModal } from "./difficulty-modal";

interface ProblemRowProps {
    id: string;
    name: string;
    tufUrl?: string;
    leetcodeUrl: string;
    status: ProblemStatus;
    onCycleStatus: (id: string) => void;
    onMarkSolved?: (id: string, rating: DifficultyRating) => void;
    type?: "code" | "video" | "article";
}

export function ProblemRow({
    id,
    name,
    tufUrl,
    leetcodeUrl,
    status,
    onCycleStatus,
    onMarkSolved,
    type = "code",
}: ProblemRowProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // If transitioning from todo to solved, show difficulty modal
        if (status === "todo" && onMarkSolved) {
            setIsModalOpen(true);
        } else {
            // Otherwise, cycle normally
            onCycleStatus(id);
        }
    };

    const handleDifficultySelect = (rating: DifficultyRating) => {
        if (onMarkSolved) {
            onMarkSolved(id, rating);
        }
    };

    const getStatusButton = () => {
        switch (status) {
            case "solved":
                return (
                    <button
                        onClick={handleStatusClick}
                        className="group relative flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-110"
                        aria-label="Mark as review"
                    >
                        <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                    </button>
                );
            case "review":
                return (
                    <button
                        onClick={handleStatusClick}
                        className="group relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 border-2 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-110"
                        aria-label="Mark as todo"
                    >
                        <Eye className="h-4 w-4 text-amber-400" strokeWidth={2.5} />
                    </button>
                );
            case "todo":
            default:
                return (
                    <button
                        onClick={handleStatusClick}
                        className="group relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-zinc-700 bg-transparent transition-all hover:border-zinc-500 hover:bg-white/5 hover:scale-110"
                        aria-label="Mark as solved"
                    >
                        <div className="h-3 w-3 rounded-full bg-transparent" />
                    </button>
                );
        }
    };

    const getActionButton = () => {
        switch (type) {
            case "video":
                return (
                    <a
                        href={leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 items-center gap-1.5 rounded-md border border-indigo-500/20 bg-indigo-500/10 px-3 text-xs font-semibold text-indigo-400 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/20 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                    >
                        <Play className="h-3.5 w-3.5" />
                        <span>Watch</span>
                    </a>
                );
            case "article":
                return (
                    <a
                        href={leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 items-center gap-1.5 rounded-md border border-purple-500/20 bg-purple-500/10 px-3 text-xs font-semibold text-purple-400 transition-all hover:border-purple-500/40 hover:bg-purple-500/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Read</span>
                    </a>
                );
            case "code":
            default:
                return (
                    <a
                        href={leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 items-center gap-1.5 rounded-md border border-white/20 bg-white px-3 text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    >
                        <Code2 className="h-3.5 w-3.5" />
                        <span>Solve</span>
                    </a>
                );
        }
    };

    const nameClasses =
        status === "solved"
            ? "text-zinc-500 line-through"
            : status === "review"
                ? "text-white font-medium"
                : "text-white";

    return (
        <>
            <div className="group flex items-center justify-between gap-4 rounded-lg border border-transparent py-3 px-4 transition-all hover:bg-white/[0.03] hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                {/* Left: Status Toggle + Problem Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getStatusButton()}
                    <span className={`text-sm tracking-tight truncate ${nameClasses}`}>
                        {name}
                    </span>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* TUF Link (if available) */}
                    {tufUrl && (
                        <a
                            href={tufUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-medium text-zinc-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">TUF</span>
                        </a>
                    )}

                    {/* Dynamic Action Button */}
                    {getActionButton()}
                </div>
            </div>

            {/* Difficulty Modal */}
            <DifficultyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleDifficultySelect}
                problemName={name}
            />
        </>
    );
}
