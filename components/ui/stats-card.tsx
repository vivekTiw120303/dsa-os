import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    trend?: "up" | "down" | "neutral";
}

export function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
                <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {value}
                </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
}
