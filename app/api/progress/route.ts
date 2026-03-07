import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PROGRESS_FILE_PATH = path.join(process.cwd(), "src", "data", "user-progress.json");

// THE FIX: Define CORS headers to allow LeetCode to ping this API
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ProgressEntry {
    status: "todo" | "solved" | "review";
    nextReviewDate?: string;
    lastUpdated?: string;
}

type ProgressData = Record<string, ProgressEntry>;

/**
 * Handle the CORS Preflight Request
 */
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * Ensure the progress file exists, create if not
 */
async function ensureProgressFile(): Promise<void> {
    try {
        await fs.access(PROGRESS_FILE_PATH);
    } catch {
        // File doesn't exist, create it with empty object
        const dir = path.dirname(PROGRESS_FILE_PATH);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(PROGRESS_FILE_PATH, JSON.stringify({}, null, 2), "utf-8");
    }
}

/**
 * Read progress data from file
 */
async function readProgressData(): Promise<ProgressData> {
    await ensureProgressFile();
    try {
        const fileContent = await fs.readFile(PROGRESS_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading progress file:", error);
        return {};
    }
}

/**
 * Write progress data to file
 */
async function writeProgressData(data: ProgressData): Promise<void> {
    await ensureProgressFile();
    await fs.writeFile(PROGRESS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * GET /api/progress
 * Returns the entire progress data
 */
export async function GET() {
    try {
        const data = await readProgressData();
        return NextResponse.json(data, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error("GET /api/progress error:", error);
        return NextResponse.json(
            { error: "Failed to read progress data" },
            { status: 500, headers: corsHeaders }
        );
    }
}

/**
 * POST /api/progress
 * Updates a single problem's progress
 * Body: { id: string, status: string, nextReviewDate?: string }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status, nextReviewDate } = body;

        console.log("API POST /api/progress received:", { id, status, nextReviewDate });

        if (!id || !status) {
            return NextResponse.json(
                { error: "Missing required fields: id and status" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (!["todo", "solved", "review"].includes(status)) {
            return NextResponse.json(
                { error: "Invalid status. Must be: todo, solved, or review" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Read current data
        const data = await readProgressData();

        // Update the specific problem
        data[id] = {
            status,
            nextReviewDate,
            lastUpdated: new Date().toISOString(),
        };

        // Write back to file
        await writeProgressData(data);

        return NextResponse.json(
            { success: true, data: data[id] },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error("POST /api/progress error:", error);
        return NextResponse.json(
            { error: "Failed to update progress data" },
            { status: 500, headers: corsHeaders }
        );
    }
}

/**
 * DELETE /api/progress
 * Clears all progress data
 */
export async function DELETE() {
    try {
        await writeProgressData({});
        return NextResponse.json(
            { success: true, message: "All progress cleared" },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error("DELETE /api/progress error:", error);
        return NextResponse.json(
            { error: "Failed to clear progress data" },
            { status: 500, headers: corsHeaders }
        );
    }
}