export const stories = [
    {
        id: 1,
        title: "The Adventure of the Little Fish",
        content: "Once upon a time, in a vast ocean...",
        imageUrl: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81s3ObWRMXL.jpg",
        interactiveElements: [
            {
                id: 'sound1',
                description: 'Hear the ocean waves',
                action: () => alert('Playing ocean wave sounds!') // Placeholder for playing a sound
            },
            {
                id: 'animation1',
                description: 'See the fish swim',
                action: () => alert('Showing a swimming fish animation!') // Placeholder for an animation
            }
        ]
    },
    {
        id: 2,
        title: "The Magic of the Ocean",
        content: "A magical land...",
        imageUrl: "https://ik.imagekit.io/storybird/images/e1904d64-6dc7-4fa7-984b-4927e68ffd11/6_172372624.png",
        interactiveElements: [
            {
                id: 'sound2',
                description: 'Hear the ocean waves',
                action: () => alert('Playing ocean wave sounds!') // Placeholder for playing a sound
            },
            {
                id: 'animation2',
                description: 'See the fish swim',
                action: () => alert('Showing a swimming fish animation!') // Placeholder for an animation
            }
        ]
    }
];