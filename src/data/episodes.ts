export interface Episode {
    id: number;
    title: string;
    description: string;
    audioFile: string;
    publishDate: string;
    duration?: string;
    imageUrl?: string;
}

export const episodes: Episode[] = [
    {
        id: 1,
        title: "Astro 5.5",
        description: "In this first episode, we'll explore the latest trends in software engineering along with a few tech updates.",
        audioFile: "first-episode.m4a",
        publishDate: "2025-03-13",
        duration: "25:30"
    }
];