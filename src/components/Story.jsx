import React from 'react';
import { useParams } from 'react-router-dom';
import { stories } from './data';


const Story = () => {
    const {storyId} = useParams()
    console.log(storyId)
    const story = stories.find(s => s.id == storyId);

    if (!story) return <p>Story not found!</p>;

    const handleInteractiveElement = (action) => {
        action();
    };

    return (
        <div className="container mt-4">
            <h2 className="text-start mb-3">{story.title}</h2>
            <img src={story.imageUrl} alt={story.title} className=" mb-3" width={'300px'} height={'200px'} style={{objectFit: 'cover'}}/>
            <p className="story-content">{story.content}</p>
            <div className="interactive-elements">
                {story.interactiveElements.map(element => (
                    <button key={element.id} className="btn btn-info m-2" onClick={() => handleInteractiveElement(element.action)}>
                        {element.description}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Story;
