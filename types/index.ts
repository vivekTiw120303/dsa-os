export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
    id: string;
    sheet: string;
    step: string;
    topic: string;
    name: string;
    difficulty: Difficulty;
    tufUrl: string;
    leetcodeUrl: string;
    status: 'todo' | 'solved' | 'review';
}
