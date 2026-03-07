import { NextRequest, NextResponse } from "next/server";

const GIST_API_URL = "https://api.github.com/gists";
const GIST_DESCRIPTION = "DSA OS - Progress Backup";
const GIST_FILENAME = "dsa-os-progress.json";

interface BackupRequest {
    token: string;
    data: Record<string, any>;
    gistId?: string;
}

/**
 * POST /api/backup
 * Backs up progress data to a GitHub Gist
 */
export async function POST(request: NextRequest) {
    try {
        const body: BackupRequest = await request.json();
        const { token, data, gistId } = body;

        if (!token) {
            return NextResponse.json(
                { error: "GitHub token is required" },
                { status: 400 }
            );
        }

        if (!data) {
            return NextResponse.json(
                { error: "Progress data is required" },
                { status: 400 }
            );
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
        };

        const gistContent = {
            description: GIST_DESCRIPTION,
            public: false,
            files: {
                [GIST_FILENAME]: {
                    content: JSON.stringify(data, null, 2),
                },
            },
        };

        let response;

        if (gistId) {
            // Update existing gist
            response = await fetch(`${GIST_API_URL}/${gistId}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify(gistContent),
            });
        } else {
            // Create new gist
            response = await fetch(GIST_API_URL, {
                method: "POST",
                headers,
                body: JSON.stringify(gistContent),
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.error("GitHub API error:", errorData);
            return NextResponse.json(
                {
                    error: errorData.message || "Failed to backup to GitHub Gist",
                    details: errorData,
                },
                { status: response.status }
            );
        }

        const gistData = await response.json();

        return NextResponse.json(
            {
                success: true,
                message: gistId
                    ? "Progress updated successfully"
                    : "Progress backed up successfully",
                gistId: gistData.id,
                gistUrl: gistData.html_url,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Backup error:", error);
        return NextResponse.json(
            {
                error: "Failed to backup progress",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/backup?gistId=xxx&token=xxx
 * Retrieves progress data from a GitHub Gist
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const gistId = searchParams.get("gistId");
        const token = searchParams.get("token");

        if (!gistId || !token) {
            return NextResponse.json(
                { error: "Gist ID and token are required" },
                { status: 400 }
            );
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
        };

        const response = await fetch(`${GIST_API_URL}/${gistId}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                {
                    error: errorData.message || "Failed to retrieve from GitHub Gist",
                    details: errorData,
                },
                { status: response.status }
            );
        }

        const gistData = await response.json();
        const fileContent = gistData.files[GIST_FILENAME]?.content;

        if (!fileContent) {
            return NextResponse.json(
                { error: "Progress file not found in Gist" },
                { status: 404 }
            );
        }

        const progressData = JSON.parse(fileContent);

        return NextResponse.json(
            {
                success: true,
                data: progressData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Restore error:", error);
        return NextResponse.json(
            {
                error: "Failed to restore progress",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
