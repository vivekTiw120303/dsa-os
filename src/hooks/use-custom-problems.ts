"use client";

import { useState, useEffect, useCallback } from "react";

export interface CustomProblem {
    id: string;
    sheet: string;
    step: string;
    topic: string;
    name: string;
    difficulty: string;
    leetcodeUrl: string;
    type: "code" | "video" | "article";
}

const STORAGE_KEY = "dsa-os-custom-problems";

/**
 * Safely read from localStorage (handles SSR)
 */
function loadCustomProblemsFromStorage(): CustomProblem[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to load custom problems from localStorage:", error);
    }

    return [];
}

/**
 * Safely write to localStorage
 */
function saveCustomProblemsToStorage(problems: CustomProblem[]): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
    } catch (error) {
        console.error("Failed to save custom problems to localStorage:", error);
    }
}

/**
 * Hook for managing custom problems (100% client-side)
 */
export function useCustomProblems() {
    const [customProblems, setCustomProblems] = useState<CustomProblem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load custom problems from localStorage on mount
    useEffect(() => {
        const problems = loadCustomProblemsFromStorage();
        setCustomProblems(problems);
        setIsHydrated(true);
    }, []);

    /**
     * Add a new custom problem
     */
    const addCustomProblem = useCallback((problem: Omit<CustomProblem, "id" | "step" | "topic">) => {
        // Generate unique ID from problem name
        const id = problem.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const newProblem: CustomProblem = {
            ...problem,
            id,
            step: "Custom Problems",
            topic: "Custom",
        };

        setCustomProblems((prev) => {
            // Check if problem already exists
            const exists = prev.some((p) => p.id === id);
            if (exists) {
                throw new Error("A problem with this name already exists");
            }

            const updated = [...prev, newProblem];
            saveCustomProblemsToStorage(updated);
            return updated;
        });

        return newProblem;
    }, []);

    /**
     * Get custom problems for a specific sheet
     */
    const getCustomProblemsForSheet = useCallback(
        (sheet: string) => {
            return customProblems.filter((p) => p.sheet === sheet);
        },
        [customProblems]
    );

    /**
     * Remove a custom problem
     */
    const removeCustomProblem = useCallback((id: string) => {
        setCustomProblems((prev) => {
            const updated = prev.filter((p) => p.id !== id);
            saveCustomProblemsToStorage(updated);
            return updated;
        });
    }, []);

    /**
     * Clear all custom problems
     */
    const clearAllCustomProblems = useCallback(() => {
        setCustomProblems([]);
        saveCustomProblemsToStorage([]);
    }, []);

    return {
        customProblems,
        addCustomProblem,
        getCustomProblemsForSheet,
        removeCustomProblem,
        clearAllCustomProblems,
        isHydrated,
    };
}
