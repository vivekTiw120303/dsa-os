import { ExternalLink, CheckCircle2, CircleDashed, Clock } from "lucide-react";
import { Problem } from "@/types";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
    problem: Problem;
}

const difficultyColors = {
    Easy: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-400",
    Medium: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 dark:text-amber-400",
    Hard: "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400",
};

const statusIcons = {
    todo: <CircleDashed className="h-5 w-5 text-slate-300 dark:text-slate-600" />,
    solved: <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />,
    review: <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
};

export function ProblemCard({ problem }: ProblemCardProps) {
    return (
        <div className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900/50">
            <div className="flex items-center gap-4">
                <button className="shrink-0 transition-transform hover:scale-110">
                    {statusIcons[problem.status]}
                </button>
                <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                        {problem.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {problem.topic}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span
                    className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium border",
                        difficultyColors[problem.difficulty]
                    )}
                >
                    {problem.difficulty}
                </span>
                <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                >
                    Solve <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
