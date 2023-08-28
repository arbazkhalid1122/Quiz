interface Question {
    id: number;
    text: string;
    options: string[];
    answer: string;
}
export const Data: { [key: string]: Question[] } = {
    frontend: [
        {
            id: 1,
            text: 'frontenmd?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 2,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 3,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
    ],
    backend: [
        { 
            id: 1,
            text: 'backend?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 2,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
        {
            id: 3,
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
            answer: 'Mars',
        },
    ],
};
