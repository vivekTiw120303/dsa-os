"use client";

import { useState, useEffect, useCallback } from "react";

export type ProblemStatus = "todo" | "solved" | "review";
export type DifficultyRating = "hard" | "good" | "easy";

export interface ProgressEntry {
    status: ProblemStatus;
    nextReviewDate?: string;
    lastUpdated?: string;
}

export type ProgressState = Record<string, ProgressEntry>;

/**
 * Calculate next review date based on difficulty rating
 */
function calculateNextReviewDate(rating: DifficultyRating): string {
    const now = new Date();
    let daysToAdd = 0;

    switch (rating) {
        case "hard":
            daysToAdd = 1;
            break;
        case "good":
            daysToAdd = 3;
            break;
        case "easy":
            daysToAdd = 7;
            break;
    }

    now.setDate(now.getDate() + daysToAdd);
    return now.toISOString();
}

/**
 * Hook for managing problem progress with API backend
 */
export function useProgress() {
    const [progressState, setProgressState] = useState<ProgressState>({});
    const [isHydrated, setIsHydrated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch progress from API on mount
    const fetchProgress = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/progress");
            if (response.ok) {
                const data = await response.json();
                setProgressState(data);
            }
        } catch (error) {
            console.error("Failed to fetch progress:", error);
        } finally {
            setIsLoading(false);
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    /**
     * Update progress via API
     */
    const updateProgress = async (
        id: string,
        status: ProblemStatus,
        nextReviewDate?: string
    ) => {
        console.log("🔄 updateProgress called:", { id, status, nextReviewDate });
        try {
            console.log("📡 Sending POST to /api/progress...");
            const response = await fetch("/api/progress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    status,
                    nextReviewDate,
                }),
            });

            console.log("📥 Response status:", response.status, response.statusText);

            if (response.ok) {
                const result = await response.json();
                console.log("✅ API response data:", result);
                // Update local state
                setProgressState((prev) => ({
                    ...prev,
                    [id]: result.data,
                }));
                return true;
            } else {
                const errorText = await response.text();
                console.error("❌ API error response:", errorText);
                return false;
            }
        } catch (error) {
            console.error("❌ Failed to update progress:", error);
            return false;
        }
    };

    /**
     * Mark a problem as solved with difficulty rating
     * This triggers the spaced repetition algorithm
     */
    const markSolved = async (id: string, difficultyRating: DifficultyRating) => {
        console.log("🎯 markSolved called:", { id, difficultyRating });
        const nextReviewDate = calculateNextReviewDate(difficultyRating);
        console.log("📅 Next review date calculated:", nextReviewDate);
        const result = await updateProgress(id, "solved", nextReviewDate);
        console.log("✅ Update result:", result);
        return result;
    };

    /**
     * Cycle through states: todo -> solved -> review -> todo
     * For solved state, this should trigger the difficulty modal
     */
    const cycleStatus = async (id: string) => {
        const current = progressState[id]?.status || "todo";
        let nextStatus: ProblemStatus;

        switch (current) {
            case "todo":
                // This should trigger the difficulty modal instead
                // For now, we'll just mark as solved without review date
                nextStatus = "solved";
                break;
            case "solved":
                nextStatus = "review";
                break;
            case "review":
                nextStatus = "todo";
                break;
            default:
                nextStatus = "todo";
        }

        return await updateProgress(id, nextStatus);
    };

    /**
     * Get progress for a specific step
     */
    const getStepProgress = (problems: Array<{ id: string }>) => {
        const total = problems.length;
        const solved = problems.filter(
            (p) =>
                progressState[p.id]?.status === "solved" ||
                progressState[p.id]?.status === "review"
        ).length;
        const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

        return { solved, total, percentage };
    };

    /**
     * Get total progress across all problems
     */
    const getTotalProgress = (allProblems: Array<{ id: string }>) => {
        return getStepProgress(allProblems);
    };

    /**
     * Get status for a specific problem
     */
    const getStatus = (id: string): ProblemStatus => {
        return progressState[id]?.status || "todo";
    };

    /**
     * Get full progress entry for a problem
     */
    const getProgressEntry = (id: string): ProgressEntry | undefined => {
        return progressState[id];
    };

    /**
     * Clear all progress - calls DELETE endpoint
     */
    const clearAllProgress = async () => {
        try {
            const response = await fetch("/api/progress", {
                method: "DELETE",
            });

            if (response.ok) {
                setProgressState({});
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to clear progress:", error);
            return false;
        }
    };

    /**
     * Get problems due for review today
     */
    const getDueForReview = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return Object.entries(progressState)
            .filter(([_, entry]) => {
                if (entry.status !== "solved" || !entry.nextReviewDate) {
                    return false;
                }

                const reviewDate = new Date(entry.nextReviewDate);
                reviewDate.setHours(0, 0, 0, 0);

                return reviewDate <= today;
            })
            .map(([id]) => id);
    };

    return {
        progressState,
        cycleStatus,
        markSolved,
        updateProgress,
        getStepProgress,
        getTotalProgress,
        getStatus,
        getProgressEntry,
        clearAllProgress,
        getDueForReview,
        isHydrated,
        isLoading,
        refetch: fetchProgress,
    };
}
