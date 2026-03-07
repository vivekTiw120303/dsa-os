import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface SheetCardProps {
    id: string;
    title: string;
    description: string;
    totalProblems: number;
    solvedProblems: number;
}

export function SheetCard({ id, title, description, totalProblems, solvedProblems }: SheetCardProps) {
    const progress = Math.round((solvedProblems / totalProblems) * 100) || 0;

    return (
        <Link
            href={`/sheets/${id}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-800"
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <BookOpen className="h-5 w-5" />
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:-rotate-45 group-hover:text-blue-500 dark:text-slate-600" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900 dark:text-white text-lg">{title}</h3>
            <p className="mb-6 flex-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                {description}
            </p>
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Progress</span>
                    <span className="text-slate-500 dark:text-slate-400">
                        {solvedProblems} / {totalProblems}
                    </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-in-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </Link>
    );
}
