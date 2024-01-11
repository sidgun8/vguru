import React, { useState, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';
import { initialWords } from './data';

const WordMatchGame = () => {
    const [words, setWords] = useState(initialWords);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        shuffleWords();
    }, []);

    const shuffleWords = () => {
        let shuffledWords = [...words];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }
        setWords(shuffledWords);
    };
    const checkAnswer = (wordId) => {
        setResponses([...responses, { question: words[currentWordIndex].name, answer: words.find(w => w.id === wordId).name }]);
    
        const newProgressIndex = currentWordIndex + 1;
        setCurrentWordIndex(newProgressIndex);
    
        if (newProgressIndex >= words.length) {
            setGameOver(true);
            // Ensure progress is set to 100% when the game is over
            setProgress(words.length);
        } else {
            setProgress(newProgressIndex);
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
            testType: 'WordMatch',
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
            <h1>Word Match Game</h1>
            <div>
                {!gameOver ?
                    <div className="word-match-game d-flex flex-column align-items-center justify-content- mt-5">
                        <h3 className="mb-4">Find the Picture: {words[currentWordIndex].name}</h3>
                        <div className="justify-content-center mb-3" style={{ maxWidth: '1100px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            {words.map(word => (
                                <div key={word.id} className="">
                                    <img 
                                        src={word.imageUrl} 
                                        alt={word.name} 
                                        onClick={() => checkAnswer(word.id)}
                                        style={{ borderRadius: '10px' }}
                                        width={150}
                                        height={150}
                                        className='object-fit-cover'
                                    />
                                </div>
                            ))}
                        </div>


                    </div>
                    :
                    <div className="word-match-game d-flex flex-column align-items-center justify-content- mt-5">
                        <h3 className="mb-4">Game Over!</h3>
                        <button onClick={handleSubmit} className="btn btn-primary">Submit Test</button>
                    </div>
                }

<div className="mt-4 w-50 mx-auto">


<ProgressBar completed={Math.round((currentWordIndex / words.length) * 100)} bgColor="#007bff" height="15px" labelSize='10px'/>
</div>


                
            </div>
            
        </div>
    );
};

export default WordMatchGame;
