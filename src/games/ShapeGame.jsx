import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';

const shapes = [
    { id: 1, name: 'Circle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/1200px-Circle_-_black_simple.svg.png' },
    { id: 2, name: 'Square', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/1200px-Square_-_black_simple.svg.png' },
    { id: 3, name: 'Triangle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/800px-Regular_triangle.svg.png' },
    { id: 4, name: 'Hexagon', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Regular_hexagon.svg/1200px-Regular_hexagon.svg.png' },
    { id: 5, name: 'Rectangle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Rectangle_%28plain%29.svg' },
    // Add more shapes
];


const ShapeGame = () => {
    const [currentShape, setCurrentShape] = useState(shapes[0]);
    const [progress, setProgress] = useState(0);
    const [responses, setResponses] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const getNextShape = () => {
        return shapes[Math.floor(Math.random() * shapes.length)];
    };

    // const handleShapeSelect = (shapeName) => {
    //     setResponses([...responses, {question: currentShape.name, answer: shapeName}]);

    //     if (progress < shapes.length - 1) {
    //         setCurrentShape(getNextShape());
    //         setProgress(progress + 1);
    //     } else {
    //         setGameOver(true);
    //     }
    // };


    const handleShapeSelect = (shapeName) => {
        setResponses([...responses, { question: currentShape.name, answer: shapeName }]);
    
        const newProgress = progress + 1;
        setProgress(newProgress);
    
        if (newProgress < shapes.length) {
            setCurrentShape(getNextShape());
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
            testType: 'ShapeGame',
        };

        try {
            const res = await axios.post(`${API_URL}/api/test/add`, test, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res);
            window.location = '/dashboard';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container mt-5'>
            <h1>Shape Game</h1>
            <div className="container text-center mt-5">
                <h2 className="mb-4">{!gameOver ? 'What shape is this?' : 'Game Over'}</h2>
                {!gameOver ? (
                    <div>
                        <img src={currentShape.imageUrl} alt={currentShape.name} className="img-fluid mb-3" width={250} />
                        <div className="d-flex justify-content-center flex-wrap">
                            {shapes.map((shape) => (
                                <button key={shape.id} className="btn btn-primary m-2" onClick={() => handleShapeSelect(shape.name)}>
                                    {shape.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit Test</button>
                    </div>
                )}
                <div className="mt-4 w-50 mx-auto">
                    <ProgressBar completed={Math.round(((progress) / shapes.length) * 100)} bgColor="#007bff" height="15px" labelSize='10px'/>
                </div>
            </div>
        </div>
    );
};

export default ShapeGame;