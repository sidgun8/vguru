import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
    const [quizData, setQuizData] = useState({
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: ''
    });

    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';

    const handleChange = (e) => {
        if (e.target.name.startsWith('answer')) {
            const index = parseInt(e.target.name.replace('answer', ''), 10) - 1;
            const updatedAnswers = [...quizData.answers];
            updatedAnswers[index] = e.target.value;
            setQuizData({ ...quizData, answers: updatedAnswers });
        } else {
            setQuizData({ ...quizData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/quiz/create`, quizData);
            console.log(response.data);
            setQuizData({
                question: '',
                answers: ['', '', '', ''],
                correctAnswer: ''
            });
            // Reset form or redirect user after successful creation
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="question" className="form-label">Question</label>
                    <input type="text" className="form-control" id="question" name="question" value={quizData.question} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    {[1, 2, 3, 4].map(i => (
                        <input key={i} type="text" className="form-control mb-2" name={`answer${i}`} placeholder={`Answer ${i}`} value={quizData.answers[i-1]} onChange={handleChange} required />
                    ))}
                </div>
                <div className="mb-3">
                    <label htmlFor="correctAnswer" className="form-label">Correct Answer</label>
                    <input type="text" className="form-control" id="correctAnswer" name="correctAnswer" value={quizData.correctAnswer} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
};

export default CreateQuiz;
