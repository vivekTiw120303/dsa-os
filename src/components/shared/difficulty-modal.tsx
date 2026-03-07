"use client";

import { X, Zap, TrendingUp, CheckCircle } from "lucide-react";
import { DifficultyRating } from "@/src/hooks/use-progress";

interface DifficultyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (rating: DifficultyRating) => void;
    problemName: string;
}

export function DifficultyModal({
    isOpen,
    onClose,
    onSelect,
    problemName,
}: DifficultyModalProps) {
    if (!isOpen) return null;

    const handleSelect = (rating: DifficultyRating) => {
        onSelect(rating);
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/10 bg-black/90 p-8 shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-white"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        How was this problem?
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Rate the difficulty to schedule your next review using spaced repetition.
                    </p>
                    <div className="mt-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                        <p className="text-sm text-zinc-300 truncate">{problemName}</p>
                    </div>
                </div>

                {/* Difficulty Options */}
                <div className="space-y-3">
                    {/* Hard - Review Tomorrow */}
                    <button
                        onClick={() => handleSelect("hard")}
                        className="group w-full rounded-xl border border-rose-500/30 bg-rose-500/[0.05] p-5 text-left transition-all hover:border-rose-500/50 hover:bg-rose-500/10 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20 group-hover:bg-rose-500/20 transition-all">
                                <Zap className="h-6 w-6 text-rose-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg font-semibold text-rose-400">Hard</h3>
                                    <span className="text-xs font-medium text-rose-400/70">
                                        Review tomorrow
                                    </span>
                                </div>
                                <p className="text-sm text-rose-400/70 leading-relaxed">
                                    This was challenging. I need to review it soon to reinforce the concepts.
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Good - Review in 3 Days */}
                    <button
                        onClick={() => handleSelect("good")}
                        className="group w-full rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-5 text-left transition-all hover:border-amber-500/50 hover:bg-amber-500/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
                                <TrendingUp className="h-6 w-6 text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg font-semibold text-amber-400">Good</h3>
                                    <span className="text-xs font-medium text-amber-400/70">
                                        Review in 3 days
                                    </span>
                                </div>
                                <p className="text-sm text-amber-400/70 leading-relaxed">
                                    I understood it well but could use a review to stay sharp.
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Easy - Review in 7 Days */}
                    <button
                        onClick={() => handleSelect("easy")}
                        className="group w-full rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5 text-left transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                                <CheckCircle className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg font-semibold text-emerald-400">Easy</h3>
                                    <span className="text-xs font-medium text-emerald-400/70">
                                        Review in 7 days
                                    </span>
                                </div>
                                <p className="text-sm text-emerald-400/70 leading-relaxed">
                                    This was straightforward. I have a solid grasp on this pattern.
                                </p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Footer Note */}
                <div className="mt-6 rounded-lg bg-white/5 border border-white/10 px-4 py-3">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Your next review will be scheduled based on your rating. This helps optimize long-term retention.
                    </p>
                </div>
            </div>
        </div>
    );
}
