import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ProblemData {
    sheet: string;
    name: string;
    url: string;
    type: "code" | "video" | "article";
    difficulty: "Easy" | "Medium" | "Hard";
}

const SHEET_FILE_MAP: Record<string, string> = {
    "a2z": "problems.json",
    "blind75": "blind75.json",
    "neetcode150": "neetcode150.json",
    "system-design": "system-design.json",
};

/**
 * POST /api/problems
 * Adds a new custom problem to the specified sheet
 */
export async function POST(request: NextRequest) {
    try {
        const body: ProblemData = await request.json();
        const { sheet, name, url, type, difficulty } = body;

        // Validate required fields
        if (!sheet || !name || !url || !type || !difficulty) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate sheet
        if (!SHEET_FILE_MAP[sheet]) {
            return NextResponse.json(
                { error: "Invalid sheet name" },
                { status: 400 }
            );
        }

        // Get the file path
        const fileName = SHEET_FILE_MAP[sheet];
        const filePath = path.join(process.cwd(), "src", "data", fileName);

        // Read the current problems
        const fileContent = await fs.readFile(filePath, "utf-8");
        const problems = JSON.parse(fileContent);

        // Generate a unique ID from the problem name
        const id = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        // Check if problem with this ID already exists
        const existingProblem = problems.find((p: any) => p.id === id);
        if (existingProblem) {
            return NextResponse.json(
                { error: "A problem with this name already exists" },
                { status: 409 }
            );
        }

        // Create the new problem object
        const newProblem = {
            id,
            sheet,
            step: "Custom Problems",
            topic: "Custom",
            name,
            difficulty,
            leetcodeUrl: url,
            type,
        };

        // Add to the problems array
        problems.push(newProblem);

        // Write back to the file
        await fs.writeFile(filePath, JSON.stringify(problems, null, 2), "utf-8");

        return NextResponse.json(
            { success: true, problem: newProblem },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/problems error:", error);
        return NextResponse.json(
            { error: "Failed to add problem" },
            { status: 500 }
        );
    }
}
