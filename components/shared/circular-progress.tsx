"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
    value: number;
    max: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    animateOnLoad?: boolean;
}

export function CircularProgress({
    value,
    max,
    size = 40,
    strokeWidth = 3.5,
    className,
    animateOnLoad = true
}: CircularProgressProps) {
    const [offset, setOffset] = useState(0);

    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const percent = Math.min(Math.max(value / max, 0), 1);

    useEffect(() => {
        if (!animateOnLoad) {
            setOffset(circumference - percent * circumference);
            return;
        }

        // Start from 0
        setOffset(circumference);

        // Timeout to allow the CSS transition to lock in
        const timeout = setTimeout(() => {
            setOffset(circumference - percent * circumference);
        }, 100);

        return () => clearTimeout(timeout);
    }, [value, max, circumference, percent, animateOnLoad]);

    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            {/* Background SVG Track */}
            <svg
                className="absolute inset-0 -rotate-90 transform"
                width={size}
                height={size}
            >
                <circle
                    className="stroke-border/20"
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                />
            </svg>

            {/* Foreground SVG Progress */}
            <svg
                className="absolute inset-0 -rotate-90 transform"
                width={size}
                height={size}
            >
                <circle
                    className={cn(
                        "stroke-blue-500",
                        animateOnLoad ? "transition-[stroke-dashoffset] duration-1000 ease-out" : ""
                    )}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
