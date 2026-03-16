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

const STORAGE_KEY = "dsa-os-progress";

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
 * Safely read from localStorage (handles SSR)
 */
function loadProgressFromStorage(): ProgressState {
    if (typeof window === "undefined") {
        return {};
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to load progress from localStorage:", error);
    }

    return {};
}

/**
 * Safely write to localStorage
 */
function saveProgressToStorage(data: ProgressState): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
    }
}

/**
 * Hook for managing problem progress with localStorage (100% client-side)
 */
export function useProgress() {
    const [progressState, setProgressState] = useState<ProgressState>({});
    const [isHydrated, setIsHydrated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load progress from localStorage on mount
    useEffect(() => {
        setIsLoading(true);
        const data = loadProgressFromStorage();
        setProgressState(data);
        setIsLoading(false);
        setIsHydrated(true);
    }, []);

    /**
     * Update progress in state and localStorage
     */
    const updateProgress = useCallback(
        (id: string, status: ProblemStatus, nextReviewDate?: string) => {
            const newEntry: ProgressEntry = {
                status,
                nextReviewDate,
                lastUpdated: new Date().toISOString(),
            };

            setProgressState((prev) => {
                const updated = {
                    ...prev,
                    [id]: newEntry,
                };
                // Immediately save to localStorage
                saveProgressToStorage(updated);
                return updated;
            });

            return true;
        },
        []
    );

    /**
     * Mark a problem as solved with difficulty rating
     * This triggers the spaced repetition algorithm
     */
    const markSolved = useCallback(
        (id: string, difficultyRating: DifficultyRating) => {
            const nextReviewDate = calculateNextReviewDate(difficultyRating);
            return updateProgress(id, "solved", nextReviewDate);
        },
        [updateProgress]
    );

    /**
     * Cycle through states: todo -> solved -> review -> todo
     */
    const cycleStatus = useCallback(
        (id: string) => {
            const current = progressState[id]?.status || "todo";
            let nextStatus: ProblemStatus;

            switch (current) {
                case "todo":
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

            return updateProgress(id, nextStatus);
        },
        [progressState, updateProgress]
    );

    /**
     * Get progress for a specific step
     */
    const getStepProgress = useCallback(
        (problems: Array<{ id: string }>) => {
            const total = problems.length;
            const solved = problems.filter(
                (p) =>
                    progressState[p.id]?.status === "solved" ||
                    progressState[p.id]?.status === "review"
            ).length;
            const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

            return { solved, total, percentage };
        },
        [progressState]
    );

    /**
     * Get total progress across all problems
     */
    const getTotalProgress = useCallback(
        (allProblems: Array<{ id: string }>) => {
            return getStepProgress(allProblems);
        },
        [getStepProgress]
    );

    /**
     * Get status for a specific problem
     */
    const getStatus = useCallback(
        (id: string): ProblemStatus => {
            return progressState[id]?.status || "todo";
        },
        [progressState]
    );

    /**
     * Get full progress entry for a problem
     */
    const getProgressEntry = useCallback(
        (id: string): ProgressEntry | undefined => {
            return progressState[id];
        },
        [progressState]
    );

    /**
     * Clear all progress
     */
    const clearAllProgress = useCallback(() => {
        setProgressState({});
        saveProgressToStorage({});
        return true;
    }, []);

    /**
     * Clear progress for a specific sheet
     */
    const clearSheetProgress = useCallback((sheetName: string, problemIds: string[]) => {
        setProgressState((prev) => {
            const updated = { ...prev };
            // Remove progress for all problems in this sheet
            problemIds.forEach(id => {
                delete updated[id];
            });
            saveProgressToStorage(updated);
            return updated;
        });
        return true;
    }, []);

    /**
     * Get problems due for review today
     */
    const getDueForReview = useCallback(() => {
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
    }, [progressState]);

    /**
     * Export progress data as JSON file download
     */
    const exportData = useCallback(() => {
        if (typeof window === "undefined") {
            return;
        }

        try {
            const dataStr = JSON.stringify(progressState, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "dsa-os-backup.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to export data:", error);
        }
    }, [progressState]);

    /**
     * Import progress data from JSON string
     */
    const importData = useCallback((jsonData: string) => {
        try {
            const parsed = JSON.parse(jsonData);

            // Validate the structure
            if (typeof parsed !== "object" || parsed === null) {
                throw new Error("Invalid data format");
            }

            // Update state and localStorage
            setProgressState(parsed);
            saveProgressToStorage(parsed);

            return true;
        } catch (error) {
            console.error("Failed to import data:", error);
            return false;
        }
    }, []);

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
        clearSheetProgress,
        getDueForReview,
        exportData,
        importData,
        isHydrated,
        isLoading,
    };
}
