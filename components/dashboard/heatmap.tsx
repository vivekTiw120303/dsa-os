"use client";

import { useMemo } from "react";
import { ProgressState } from "@/src/hooks/use-progress";

interface HeatmapProps {
    progressData: ProgressState;
}

interface DayData {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

export function Heatmap({ progressData }: HeatmapProps) {
    const heatmapData = useMemo(() => {
        // Generate last 365 days
        const days: DayData[] = [];
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 364); // 365 days including today

        // Count problems solved per day
        const solvedByDay: Record<string, number> = {};

        Object.entries(progressData).forEach(([_, entry]) => {
            if (entry.lastUpdated) {
                const date = new Date(entry.lastUpdated);
                const dateKey = date.toISOString().split("T")[0];
                solvedByDay[dateKey] = (solvedByDay[dateKey] || 0) + 1;
            }
        });

        // Generate day data
        for (let i = 0; i < 365; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const dateKey = currentDate.toISOString().split("T")[0];
            const count = solvedByDay[dateKey] || 0;

            // Determine level based on count
            let level: 0 | 1 | 2 | 3 | 4 = 0;
            if (count === 0) level = 0;
            else if (count <= 2) level = 1;
            else if (count <= 4) level = 2;
            else if (count <= 6) level = 3;
            else level = 4;

            days.push({
                date: dateKey,
                count,
                level,
            });
        }

        return days;
    }, [progressData]);

    const getLevelClass = (level: number) => {
        switch (level) {
            case 0:
                return "bg-zinc-900 border border-zinc-800";
            case 1:
                return "bg-emerald-950 border border-emerald-900";
            case 2:
                return "bg-emerald-800 border border-emerald-700";
            case 3:
                return "bg-emerald-600 border border-emerald-500";
            case 4:
                return "bg-emerald-400 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]";
            default:
                return "bg-zinc-900 border border-zinc-800";
        }
    };

    // Group days by week
    const weeks: DayData[][] = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
        weeks.push(heatmapData.slice(i, i + 7));
    }

    // Get month labels
    const getMonthLabel = (weekIndex: number) => {
        const firstDayOfWeek = heatmapData[weekIndex * 7];
        if (!firstDayOfWeek) return null;

        const date = new Date(firstDayOfWeek.date);
        const dayOfMonth = date.getDate();

        // Only show month label if it's the first week of the month
        if (dayOfMonth <= 7) {
            return date.toLocaleDateString("en-US", { month: "short" });
        }
        return null;
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                        Activity Heatmap
                    </h3>
                    <p className="text-sm text-zinc-500">
                        Your problem-solving activity over the last year
                    </p>
                </div>
            </div>

            {/* Heatmap Grid */}
            <div className="relative overflow-x-auto pb-4">
                {/* Month Labels */}
                <div className="flex gap-[3px] mb-2 ml-8">
                    {weeks.map((_, weekIndex) => {
                        const label = getMonthLabel(weekIndex);
                        return (
                            <div
                                key={weekIndex}
                                className="flex-shrink-0"
                                style={{ width: "12px" }}
                            >
                                {label && (
                                    <span className="text-[10px] text-zinc-600 font-medium">
                                        {label}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Day Labels + Grid */}
                <div className="flex gap-[3px]">
                    {/* Day of week labels */}
                    <div className="flex flex-col gap-[3px] justify-around pr-2">
                        <div className="h-3 flex items-center">
                            <span className="text-[10px] text-zinc-600">Mon</span>
                        </div>
                        <div className="h-3" />
                        <div className="h-3 flex items-center">
                            <span className="text-[10px] text-zinc-600">Wed</span>
                        </div>
                        <div className="h-3" />
                        <div className="h-3 flex items-center">
                            <span className="text-[10px] text-zinc-600">Fri</span>
                        </div>
                        <div className="h-3" />
                    </div>

                    {/* Heatmap cells */}
                    <div className="flex gap-[3px]">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[3px]">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className={`group relative h-3 w-3 rounded-sm transition-all hover:ring-2 hover:ring-white/20 cursor-pointer ${getLevelClass(
                                            day.level
                                        )}`}
                                        title={`${day.date}: ${day.count} problem${day.count !== 1 ? "s" : ""
                                            }`}
                                    >
                                        {/* Tooltip on hover */}
                                        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                                            <div className="rounded-lg bg-black/90 border border-white/10 px-3 py-2 text-xs text-white whitespace-nowrap shadow-lg backdrop-blur-xl">
                                                <div className="font-semibold">
                                                    {new Date(day.date).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </div>
                                                <div className="text-zinc-400">
                                                    {day.count} problem{day.count !== 1 ? "s" : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-end gap-2">
                <span className="text-xs text-zinc-600">Less</span>
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={`h-3 w-3 rounded-sm ${getLevelClass(level)}`}
                        />
                    ))}
                </div>
                <span className="text-xs text-zinc-600">More</span>
            </div>
        </div>
    );
}
