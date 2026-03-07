"use client";

import { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";

interface AddProblemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddProblemModal({ isOpen, onClose }: AddProblemModalProps) {
    const [formData, setFormData] = useState({
        sheet: "a2z",
        name: "",
        url: "",
        type: "code" as "code" | "video" | "article",
        difficulty: "Medium" as "Easy" | "Medium" | "Hard",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await fetch("/api/problems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("✓ Problem added successfully!");
                setTimeout(() => {
                    onClose();
                    setFormData({
                        sheet: "a2z",
                        name: "",
                        url: "",
                        type: "code",
                        difficulty: "Medium",
                    });
                    setMessage("");
                }, 1500);
            } else {
                setMessage(`✗ ${result.error || "Failed to add problem"}`);
            }
        } catch (error) {
            setMessage("✗ Failed to add problem. Check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/10 bg-black/90 p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-white"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <Plus className="h-5 w-5 text-emerald-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            Add Custom Problem
                        </h2>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Add your own problems, videos, or articles to any practice sheet.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Sheet Selection */}
                    <div>
                        <label htmlFor="sheet" className="block text-sm font-medium text-zinc-300 mb-2">
                            Sheet
                        </label>
                        <select
                            id="sheet"
                            value={formData.sheet}
                            onChange={(e) => setFormData({ ...formData, sheet: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            required
                        >
                            <option value="a2z">Striver&apos;s A2Z</option>
                            <option value="blind75">Blind 75</option>
                            <option value="neetcode150">NeetCode 150</option>
                            <option value="system-design">System Design</option>
                        </select>
                    </div>

                    {/* Problem Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                            Problem Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Two Sum"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            required
                        />
                    </div>

                    {/* URL */}
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-zinc-300 mb-2">
                            URL
                        </label>
                        <input
                            id="url"
                            type="url"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder="https://leetcode.com/problems/..."
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            required
                        />
                    </div>

                    {/* Type and Difficulty Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Type */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-zinc-300 mb-2">
                                Type
                            </label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                required
                            >
                                <option value="code">Code</option>
                                <option value="video">Video</option>
                                <option value="article">Article</option>
                            </select>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-zinc-300 mb-2">
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                value={formData.difficulty}
                                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                required
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Adding Problem...
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                Add Problem
                            </>
                        )}
                    </button>

                    {/* Status Message */}
                    {message && (
                        <div
                            className={`rounded-lg border px-4 py-2.5 text-sm text-center ${message.startsWith("✓")
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                : "border-red-500/30 bg-red-500/10 text-red-400"
                                }`}
                        >
                            {message}
                        </div>
                    )}
                </form>

                {/* Footer Note */}
                <div className="mt-6 rounded-lg bg-white/5 border border-white/10 px-4 py-3">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Custom problems are stored locally in your data files. They will appear in the selected sheet immediately after adding.
                    </p>
                </div>
            </div>
        </div>
    );
}
