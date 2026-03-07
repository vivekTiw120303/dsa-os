import { notFound } from "next/navigation";
import problemsData from "@/src/data/problems.json";
import { ProblemRow } from "@/components/shared/problem-row";
import { Problem } from "@/types";
import { TopicSection } from "@/components/shared/topic-section";
import { StepProgressStats } from "@/components/shared/step-progress-stats";

export function generateStaticParams() {
    return [{ sheet: "a2z" }];
}

export default async function SheetDetailPage({
    params,
}: {
    params: Promise<{ sheet: string }>;
}) {
    const { sheet } = await params;

    if (sheet !== "a2z") {
        // For now we only have data for a2z
        notFound();
    }

    // Filter problems for this sheet
    const sheetProblems = (problemsData as Problem[]).filter((p) => p.sheet === sheet);

    // Group by Step
    const groupedData: Record<string, Record<string, Problem[]>> = {};

    sheetProblems.forEach((problem) => {
        if (!groupedData[problem.step]) {
            groupedData[problem.step] = {};
        }
        if (!groupedData[problem.step][problem.topic]) {
            groupedData[problem.step][problem.topic] = [];
        }
        groupedData[problem.step][problem.topic].push(problem);
    });

    return (
        <div className="relative w-full pb-32 animate-in fade-in duration-500 selection:bg-primary/20">
            {/* Ultra-subtle hero glow */}
            <div className="absolute inset-x-0 top-0 h-[300px] w-full bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 z-10 space-y-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        Striver&apos;s A2Z DSA Sheet
                    </h1>
                    <p className="text-muted-foreground/70 max-w-2xl text-sm leading-relaxed">
                        Master competitive programming with a structured approach. Focus on consistency and deep understanding.
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    {Object.entries(groupedData).map(([stepName, topics]) => {
                        const stepProblemIds = Object.values(topics).flatMap(problems => problems.map(p => p.id));

                        return (
                            <div key={stepName} className="flex flex-col relative w-full">
                                {/* Sleek Sticky Step Header */}
                                <div className="sticky top-14 z-20 -mx-4 mb-8 px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-background/80 backdrop-blur-xl border-b border-border/20 supports-[backdrop-filter]:bg-background/60 transition-colors flex items-center justify-between">
                                    <h2 className="text-sm font-bold tracking-wide text-foreground uppercase opacity-90">
                                        {stepName}
                                    </h2>
                                    <StepProgressStats problemIds={stepProblemIds} />
                                </div>

                                {/* Topics within Step */}
                                <div className="flex flex-col w-full pl-0 sm:pl-2">
                                    {Object.entries(topics).map(([topicName, problems]) => (
                                        <TopicSection key={topicName} title={topicName} defaultExpanded={false}>
                                            <div className="flex flex-col w-full group/list">
                                                {problems.map((problem) => (
                                                    <ProblemRow
                                                        key={problem.id}
                                                        id={problem.id}
                                                        name={problem.name}
                                                        tufUrl={problem.tufUrl}
                                                        leetcodeUrl={problem.leetcodeUrl}
                                                        status="todo"
                                                        onCycleStatus={() => { }}
                                                    />
                                                ))}
                                            </div>
                                        </TopicSection>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
