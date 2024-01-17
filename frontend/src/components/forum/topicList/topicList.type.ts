export interface Topic {
    _id: string;
    name: string;
    description: string;
    numberOfPosts: number;
    lastPost?: { _id: string } | null;
}

export const getInitialTopics= (): Topic[] => {
    return [
        {
            _id: "1",
            name: "topic1",
            description: "description1",
            numberOfPosts: 0,
            lastPost: { _id: "1" }
        },
        {
            _id: "2",
            name: "topic2",
            description: "description1",
            numberOfPosts: 0
        },
        {
            _id: "3",
            name: "topic3",
            description: "description1",
            numberOfPosts: 0
        },
        {
            _id: "4",
            name: "topic4",
            description: "description1",
            numberOfPosts: 0
        },
        {
            _id: "5",
            name: "topic5",
            description: "description1",
            numberOfPosts: 0
        }
    ]
}