import { useState, useEffect } from "react";

export function useProgress() {
    const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("dsa_solved");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed)) {
                        setSolvedIds(new Set(parsed.map(String)));
                    }
                } catch (e) {
                    console.error("Failed to parse solved progress", e);
                }
            }
        }
    }, []);

    const toggleSolved = (id: string | number) => {
        const stringId = String(id);
        setSolvedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(stringId)) {
                newSet.delete(stringId);
            } else {
                newSet.add(stringId);
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("dsa_solved", JSON.stringify(Array.from(newSet)));
            }

            return newSet;
        });
    };

    const getProgress = () => {
        return solvedIds.size;
    };

    return { solvedIds, toggleSolved, getProgress };
}
