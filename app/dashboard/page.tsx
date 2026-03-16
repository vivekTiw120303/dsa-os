"use client";

import { useState, useRef } from "react";
import { useProgress } from "@/src/hooks/use-progress";
import problemsData from "@/src/data/problems.json";
import { ProblemRow } from "@/components/shared/problem-row";
import { Heatmap } from "@/components/dashboard/heatmap";
import { AddProblemModal } from "@/components/shared/add-problem-modal";
import {
    TrendingUp,
    Eye,
    Target,
    Calendar,
    CheckCircle,
    Plus,
    Download,
    Upload,
    Database,
} from "lucide-react";

interface Problem {
    id: string;
    sheet: string;
    step: string;
    topic: string;
    name: string;
    difficulty: string;
    leetcodeUrl: string;
    gfgUrl?: string;
    tufUrl?: string;
    status: string;
}

export default function DashboardPage() {
    const {
        progressState,
        isHydrated,
        getDueForReview,
        cycleStatus,
        markSolved,
        exportData,
        importData,
    } = useProgress();

    const [isAddProblemModalOpen, setIsAddProblemModalOpen] = useState(false);
    const [importMessage, setImportMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const problems = problemsData as Problem[];

    // Calculate stats
    const totalSolved = Object.values(progressState).filter(
        (entry) => entry.status === "solved"
    ).length;

    const totalReview = Object.values(progressState).filter(
        (entry) => entry.status === "review"
    ).length;

    const TOTAL_PROBLEMS = 454;
    const completionPercentage = Math.round(
        ((totalSolved + totalReview) / TOTAL_PROBLEMS) * 100
    );

    // Get problems due for review today
    const dueForReviewIds = getDueForReview();
    const dueProblems = problems.filter((p) => dueForReviewIds.includes(p.id));

    const handleExport = () => {
        exportData();
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = event.target?.result as string;
                const success = importData(jsonData);

                if (success) {
                    setImportMessage("✓ Data imported successfully!");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    setImportMessage("✗ Failed to import data. Invalid format.");
                }
            } catch (error) {
                setImportMessage("✗ Failed to read file.");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="relative min-h-screen bg-black">
            {/* Radial gradient background glow */}
            <div className="absolute inset-x-0 top-0 h-[400px] w-full bg-gradient-radial from-white/[0.02] via-transparent to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-3">
                        Dashboard
                    </h1>
                    <p className="text-lg text-zinc-400">
                        Your real-time algorithmic operating system.
                    </p>
                </div>

                {/* Stats Grid */}
                {!isHydrated ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                            {/* Card 1: Total Solved */}
                            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                        <TrendingUp className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                            Solved
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-5xl font-bold text-emerald-400 tracking-tight shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                        {totalSolved}
                                    </p>
                                    <p className="text-sm text-zinc-500">Problems completed</p>
                                </div>
                            </div>

                            {/* Card 2: In Review */}
                            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-amber-500/30 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                                        <Eye className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                            Review
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-5xl font-bold text-amber-400 tracking-tight shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                        {totalReview}
                                    </p>
                                    <p className="text-sm text-zinc-500">Needs revision</p>
                                </div>
                            </div>

                            {/* Card 3: Global Completion */}
                            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 border border-white/20">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                            Completion
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-5xl font-bold text-white tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                        {completionPercentage}%
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        {totalSolved + totalReview} / {TOTAL_PROBLEMS} problems
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Daily Dispatch Section */}
                        <div className="mb-12">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="h-6 w-6 text-amber-400" />
                                    <h2 className="text-2xl font-bold text-white">
                                        Daily Dispatch
                                    </h2>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Your spaced repetition queue. Clear these out today.
                                </p>
                            </div>

                            {dueProblems.length > 0 ? (
                                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.02] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                                                <TrendingUp className="h-4 w-4 text-amber-400" />
                                            </div>
                                            <span className="text-sm font-semibold text-amber-400">
                                                {dueProblems.length} problem
                                                {dueProblems.length !== 1 ? "s" : ""} due today
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        {dueProblems.map((problem) => (
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
                                </div>
                            ) : (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-12 backdrop-blur-xl">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                            <CheckCircle className="h-8 w-8 text-emerald-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            You are all caught up for today
                                        </h3>
                                        <p className="text-sm text-zinc-500 max-w-md">
                                            No problems are due for review right now. Keep solving new
                                            problems or come back tomorrow for your next batch.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cloud Sync Section */}
                        <div className="mb-12">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Plus className="h-6 w-6 text-emerald-400" />
                                    <h2 className="text-2xl font-bold text-white">Add Custom Problem</h2>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Extend your practice sheets with custom problems.
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                            <Plus className="h-6 w-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-white mb-1">
                                                Customize Your Curriculum
                                            </h3>
                                            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                                                Add your own problems, videos, or articles to any sheet. Perfect for company-specific prep or personal study goals.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsAddProblemModalOpen(true)}
                                        className="flex-shrink-0 flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Problem
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Data Management Section */}
                        <div className="mb-12">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Database className="h-6 w-6 text-blue-400" />
                                    <h2 className="text-2xl font-bold text-white">Data Management</h2>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Export your progress as a backup or import from a previous backup file.
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {/* Export Button */}
                                        <button
                                            onClick={handleExport}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                        >
                                            <Download className="h-4 w-4" />
                                            Export Backup
                                        </button>

                                        {/* Import Button */}
                                        <button
                                            onClick={handleImportClick}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-400 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Import Backup
                                        </button>

                                        {/* Hidden File Input */}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".json"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>

                                    {/* Import Message */}
                                    {importMessage && (
                                        <div
                                            className={`rounded-lg border px-4 py-2.5 text-sm text-center ${importMessage.startsWith("✓")
                                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                                : "border-red-500/30 bg-red-500/10 text-red-400"
                                                }`}
                                        >
                                            {importMessage}
                                        </div>
                                    )}

                                    {/* Info Note */}
                                    <div className="rounded-lg bg-white/5 border border-white/10 px-4 py-3">
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            Your progress is stored locally in your browser. Export regularly to prevent data loss if you clear your browser cache.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activity Heatmap */}
                        <div className="rounded-xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
                            <Heatmap progressData={progressState} />
                        </div>
                    </>
                )}
            </div>

            {/* Add Problem Modal */}
            <AddProblemModal
                isOpen={isAddProblemModalOpen}
                onClose={() => setIsAddProblemModalOpen(false)}
            />
        </div>
    );
}
