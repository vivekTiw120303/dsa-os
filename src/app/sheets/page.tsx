"use client";

import { useProgress } from "@/src/hooks/use-progress";
import Link from "next/link";
import { FileText, Lock, AlertTriangle } from "lucide-react";

export default function SheetsPage() {
    const { clearAllProgress } = useProgress();

    const handleReset = async () => {
        const confirmed = window.confirm(
            "Are you sure? This will permanently wipe all solved and review states from your local machine. This action cannot be undone."
        );

        if (confirmed) {
            const success = await clearAllProgress();
            if (success) {
                alert("All progress has been reset successfully.");
            } else {
                alert("Failed to reset progress. Please try again.");
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            {/* Radial gradient background glow */}
            <div className="absolute inset-x-0 top-0 h-[400px] w-full bg-gradient-radial from-white/[0.02] via-transparent to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-3">
                        Problem Sheets
                    </h1>
                    <p className="text-lg text-zinc-400">
                        Select your curriculum.
                    </p>
                </div>

                {/* Sheets Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
                    {/* Active Card: Striver's A2Z Sheet */}
                    <Link
                        href="/sheets/a2z"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                Active
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                                Striver&apos;s A2Z Sheet
                            </h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Comprehensive DSA curriculum covering all fundamental topics from basics to advanced.
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-600">
                                <span>357 Problems</span>
                                <span>•</span>
                                <span>18 Steps</span>
                            </div>
                        </div>
                    </Link>

                    {/* Active Card: Blind 75 */}
                    <Link
                        href="/sheets/blind75"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                Active
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                                Blind 75
                            </h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Curated list of 75 must-do problems for technical interview preparation.
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-600">
                                <span>75 Problems</span>
                                <span>•</span>
                                <span>8 Categories</span>
                            </div>
                        </div>
                    </Link>

                    {/* Active Card: NeetCode 150 */}
                    <Link
                        href="/sheets/neetcode150"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                Active
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                                NeetCode 150
                            </h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Extended problem set covering essential patterns for coding interviews.
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-600">
                                <span>150 Problems</span>
                                <span>•</span>
                                <span>15 Topics</span>
                            </div>
                        </div>
                    </Link>

                    {/* Active Card: System Design */}
                    <Link
                        href="/sheets/system-design"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-indigo-500/30 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                                <FileText className="h-6 w-6 text-indigo-400" />
                            </div>
                            <div className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-400">
                                Active
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                System Design
                            </h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                HLD, LLD, and scalable architectures for senior engineering roles.
                            </p>
                            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-600">
                                <span>75 Topics</span>
                                <span>•</span>
                                <span>6 Steps</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Danger Zone */}
                <div className="mt-12 rounded-xl border border-red-900/30 bg-red-950/10 p-6 backdrop-blur-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                                <AlertTriangle className="h-5 w-5 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-red-400 mb-1">
                                    Reset Workspace
                                </h3>
                                <p className="text-sm text-red-400/70 leading-relaxed max-w-xl">
                                    Permanently wipe all solved and review states from your local machine. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleReset}
                            className="flex-shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        >
                            Reset All Progress
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
