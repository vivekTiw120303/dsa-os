"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@/src/hooks/use-progress";
import problemsData from "@/src/data/problems.json";
import { ProblemRow } from "@/src/components/shared/problem-row";
import { Heatmap } from "@/src/components/dashboard/heatmap";
import {
    TrendingUp,
    Eye,
    Target,
    Calendar,
    CheckCircle,
    Cloud,
    Upload,
    Download,
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
    } = useProgress();

    const [githubToken, setGithubToken] = useState("");
    const [gistId, setGistId] = useState("");
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);
    const [backupMessage, setBackupMessage] = useState("");

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

    const handleBackup = async () => {
        if (!githubToken.trim()) {
            setBackupMessage("Please enter a GitHub token");
            return;
        }

        setIsBackingUp(true);
        setBackupMessage("");

        try {
            const response = await fetch("/api/backup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: githubToken,
                    data: progressState,
                    gistId: gistId || undefined,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setBackupMessage(`✓ ${result.message}`);
                if (result.gistId && !gistId) {
                    setGistId(result.gistId);
                    // Store gist ID in localStorage for future use
                    localStorage.setItem("dsa-os-gist-id", result.gistId);
                }
            } else {
                setBackupMessage(`✗ ${result.error}`);
            }
        } catch (error) {
            setBackupMessage("✗ Failed to backup. Check your connection.");
        } finally {
            setIsBackingUp(false);
        }
    };

    const handleRestore = async () => {
        if (!githubToken.trim() || !gistId.trim()) {
            setBackupMessage("Please enter both GitHub token and Gist ID");
            return;
        }

        setIsRestoring(true);
        setBackupMessage("");

        try {
            const response = await fetch(
                `/api/backup?gistId=${gistId}&token=${githubToken}`
            );

            const result = await response.json();

            if (response.ok) {
                // Update local progress with restored data
                for (const [id, entry] of Object.entries(result.data)) {
                    await fetch("/api/progress", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id,
                            status: (entry as any).status,
                            nextReviewDate: (entry as any).nextReviewDate,
                        }),
                    });
                }
                setBackupMessage("✓ Progress restored successfully");
                window.location.reload();
            } else {
                setBackupMessage(`✗ ${result.error}`);
            }
        } catch (error) {
            setBackupMessage("✗ Failed to restore. Check your connection.");
        } finally {
            setIsRestoring(false);
        }
    };

    // Load gist ID from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedGistId = localStorage.getItem("dsa-os-gist-id");
            if (storedGistId) {
                setGistId(storedGistId);
            }
        }
    }, []);

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
                                    <Cloud className="h-6 w-6 text-blue-400" />
                                    <h2 className="text-2xl font-bold text-white">Cloud Sync</h2>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Backup your progress to GitHub Gist for safekeeping.
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
                                <div className="space-y-4">
                                    {/* GitHub Token Input */}
                                    <div>
                                        <label
                                            htmlFor="github-token"
                                            className="block text-sm font-medium text-zinc-300 mb-2"
                                        >
                                            GitHub Personal Access Token
                                        </label>
                                        <input
                                            id="github-token"
                                            type="password"
                                            value={githubToken}
                                            onChange={(e) => setGithubToken(e.target.value)}
                                            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                                        />
                                        <p className="mt-1 text-xs text-zinc-600">
                                            Need a token?{" "}
                                            <a
                                                href="https://github.com/settings/tokens/new?scopes=gist"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 underline"
                                            >
                                                Create one here
                                            </a>{" "}
                                            with &apos;gist&apos; scope
                                        </p>
                                    </div>

                                    {/* Gist ID Input (for restore) */}
                                    <div>
                                        <label
                                            htmlFor="gist-id"
                                            className="block text-sm font-medium text-zinc-300 mb-2"
                                        >
                                            Gist ID (optional, for restore)
                                        </label>
                                        <input
                                            id="gist-id"
                                            type="text"
                                            value={gistId}
                                            onChange={(e) => setGistId(e.target.value)}
                                            placeholder="Auto-filled after first backup"
                                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleBackup}
                                            disabled={isBackingUp}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {isBackingUp ? "Backing up..." : "Backup to Gist"}
                                        </button>

                                        <button
                                            onClick={handleRestore}
                                            disabled={isRestoring}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-400 transition-all hover:border-blue-500/50 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Download className="h-4 w-4" />
                                            {isRestoring ? "Restoring..." : "Restore from Gist"}
                                        </button>
                                    </div>

                                    {/* Status Message */}
                                    {backupMessage && (
                                        <div
                                            className={`rounded-lg border px-4 py-2.5 text-sm ${backupMessage.startsWith("✓")
                                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                                : "border-red-500/30 bg-red-500/10 text-red-400"
                                                }`}
                                        >
                                            {backupMessage}
                                        </div>
                                    )}
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
        </div>
    );
}
