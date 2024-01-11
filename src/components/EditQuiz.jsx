import React, { useState } from 'react';
import axios from 'axios';

const EditQuiz = ({ quiz, onQuizUpdated }) => {
    const [quizData, setQuizData] = useState({
        question: quiz.question,
        answers: quiz.answers,
        correctAnswer: quiz.correctAnswer
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
            const response = await axios.patch(`${API_URL}/api/quiz/${quiz._id}`, quizData);
            onQuizUpdated(response.data);
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="question" className="form-label">Question</label>
                <input type="text" className="form-control" id="question" name="question" value={quizData.question} onChange={handleChange} required />
            </div>
            {[1, 2, 3, 4].map(i => (
                <div className="mb-3" key={i}>
                    <label htmlFor={`answer${i}`} className="form-label">{`Answer ${i}`}</label>
                    <input type="text" className="form-control" id={`answer${i}`} name={`answer${i}`} value={quizData.answers[i - 1]} onChange={handleChange} required />
                </div>
            ))}
            <div className="mb-3">
                <label htmlFor="correctAnswer" className="form-label">Correct Answer</label>
                <input type="text" className="form-control" id="correctAnswer" name="correctAnswer" value={quizData.correctAnswer} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
};

export default EditQuiz;
