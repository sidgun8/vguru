import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react';
import axios from 'axios';

const colors = [
    { id: 1, name: 'Red', colorCode: '#FF0000' },
    { id: 2, name: 'Blue', colorCode: '#0000FF' },
    { id: 3, name: 'Green', colorCode: '#00FF00' },
    { id: 4, name: 'Yellow', colorCode: '#FFFF00' },
    { id: 5, name: 'Purple', colorCode: '#800080' },
    // Add more colors
];
const ColorGame = () => {
    const [currentColor, setCurrentColor] = useState(colors[0]);
    const [responses, setResponses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [progress, setProgress] = useState(0);

    const getNextColor = (current) => {
        let nextColor;
        do {
            nextColor = colors[Math.floor(Math.random() * colors.length)];
        } while (nextColor.id === current.id);
        return nextColor;
    };

    const handleColorSelect = (colorName) => {
        setResponses([...responses, { question: currentColor.name, answer: colorName }]);
        
        const newProgress = progress + 1;
        setProgress(newProgress);

        if (newProgress < colors.length) {
            setCurrentColor(getNextColor(currentColor));
        } else {
            setGameOver(true);
        }
    };

    const calculateScore = () => {
        return responses.reduce((score, response) => {
            return score + (response.question === response.answer ? 1 : 0);
        }, 0);
    };

    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';

    const handleSubmit = async () => {
        const score = calculateScore();
        let test = {
            marks: score,
            testType: 'ColorMatch',
        };

        try {
            const res = await axios.post(`${API_URL}/api/test/add`, test, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res);
            window.location = '/';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container mt-5'>
            <h1>Color Game</h1>
            <div className="container text-center mt-5">
                <h2 className="mb-4">{!gameOver ? 'What color is this?' : 'Game Over'}</h2>
                {!gameOver ? (
                    <>
                        <div style={{ width: '200px', height: '200px', backgroundColor: currentColor.colorCode, margin: '0 auto', borderRadius: '20px' }} className="mb-3"></div>
                        <div className="d-flex justify-content-center flex-wrap">
                            {colors.map((color) => (
                                <button key={color.id} className="btn btn-primary m-2" onClick={() => handleColorSelect(color.name)}>
                                    {color.name}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit Test</button>
                    </div>
                )}
                <div className="mt-4 w-50 mx-auto">

<ProgressBar completed={Math.round((progress / colors.length) * 100)} bgColor="#007bff" height="15px" labelSize='10px'/>
</div>

            </div>
        </div>
    );
};

export default ColorGame;