export default function Loading() {
    return (
        <div className="relative w-full pb-32 animate-in fade-in duration-500">
            {/* Ultra-subtle hero glow */}
            <div className="absolute inset-x-0 top-0 h-[300px] w-full bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 z-10 space-y-16">
                <div className="mb-8 animate-pulse">
                    <div className="h-8 w-3/4 max-w-md bg-muted/60 rounded-md mb-4"></div>
                    <div className="h-3 w-full max-w-2xl bg-muted/40 rounded mt-2"></div>
                </div>

                <div className="flex flex-col gap-16">
                    {[1, 2].map((step) => (
                        <div key={step} className="flex flex-col relative w-full animate-pulse">
                            <div className="mb-8 px-4 py-3 flex items-center justify-between border-b border-border/20">
                                <div className="h-4 w-48 bg-muted/60 rounded"></div>
                                <div className="h-2 w-16 bg-muted/40 rounded"></div>
                            </div>

                            <div className="flex flex-col w-full pl-0 sm:pl-2 gap-8">
                                {[1, 2].map((topic) => (
                                    <div key={topic} className="flex flex-col w-full">
                                        <div className="flex items-center gap-3 w-full py-2 mb-2">
                                            <div className="h-3 w-3 bg-muted/40 rounded-sm"></div>
                                            <div className="h-3 w-32 bg-muted/60 rounded"></div>
                                            <div className="flex-1 h-[1px] bg-border/20"></div>
                                        </div>
                                        <div className="flex flex-col border-l border-border/20 py-2 pl-[9px] gap-4">
                                            {[1, 2, 3].map((row) => (
                                                <div key={row} className="flex items-center gap-4 py-2 pl-6 pr-4">
                                                    <div className="h-3.5 w-3.5 rounded-[3px] bg-muted/40 shrink-0"></div>
                                                    <div className="h-3 w-72 bg-muted/40 rounded"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
