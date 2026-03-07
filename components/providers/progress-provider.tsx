"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ProblemStatus = "pending" | "done" | "revise";

interface ProgressContextType {
    problemStatuses: Record<string, ProblemStatus>;
    toggleProblem: (id: string) => void;
    getProblemStatus: (id: string) => ProblemStatus;
    setProblemStatus: (id: string, status: ProblemStatus) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [problemStatuses, setProblemStatuses] = useState<Record<string, ProblemStatus>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from local storage on mount
        const stored = localStorage.getItem("dsaos-progress-v2");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Migrate old Array-based state to Record-based state
                if (Array.isArray(parsed)) {
                    const migrated: Record<string, ProblemStatus> = {};
                    parsed.forEach((id: string) => {
                        migrated[id] = "done";
                    });
                    setProblemStatuses(migrated);
                    localStorage.setItem("dsaos-progress-v2", JSON.stringify(migrated));
                } else if (typeof parsed === "object" && parsed !== null) {
                    setProblemStatuses(parsed);
                }
            } catch (e) {
                console.error("Failed to parse stored progress", e);
            }
        } else {
            // Attempt to migrate v1 progress just in case
            const oldStored = localStorage.getItem("dsaos-progress");
            if (oldStored) {
                try {
                    const parsed = JSON.parse(oldStored);
                    if (Array.isArray(parsed)) {
                        const migrated: Record<string, ProblemStatus> = {};
                        parsed.forEach((id: string) => {
                            migrated[id] = "done";
                        });
                        setProblemStatuses(migrated);
                        localStorage.setItem("dsaos-progress-v2", JSON.stringify(migrated));
                    }
                } catch (e) {
                    // Ignore
                }
            }
        }
        setIsLoaded(true);
    }, []);

    const toggleProblem = (id: string) => {
        setProblemStatuses((prev) => {
            const next = { ...prev };
            const currentStatus = next[id] || "pending";

            // Cycle: pending -> done -> revise -> pending
            if (currentStatus === "pending") {
                next[id] = "done";
            } else if (currentStatus === "done") {
                next[id] = "revise";
            } else {
                delete next[id]; // Reverting to pending just removes it from storage
            }

            // Save to local storage
            localStorage.setItem("dsaos-progress-v2", JSON.stringify(next));
            return next;
        });
    };

    const setProblemStatus = (id: string, status: ProblemStatus) => {
        setProblemStatuses((prev) => {
            const next = { ...prev };
            if (status === "pending") {
                delete next[id];
            } else {
                next[id] = status;
            }
            localStorage.setItem("dsaos-progress-v2", JSON.stringify(next));
            return next;
        });
    };

    const getProblemStatus = (id: string): ProblemStatus => {
        return problemStatuses[id] || "pending";
    };

    return (
        <ProgressContext.Provider value={{ problemStatuses, toggleProblem, getProblemStatus, setProblemStatus }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
}
