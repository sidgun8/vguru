import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditQuiz from './EditQuiz'; // Import the EditQuiz component

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [editingQuizId, setEditingQuizId] = useState(null);


    const handleEditClick = (quizId) => {
        setEditingQuizId(quizId);
    };

    const handleDelete = async (quizId) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            try {
                await axios.delete(`${API_URL}/api/quiz/${quizId}`);
                setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
            } catch (error) {
                console.error("Error deleting quiz:", error);
            }
        }
    };


    const onQuizUpdated = (updatedQuiz) => {
        const updatedQuizzes = quizzes.map(quiz => 
            quiz._id === updatedQuiz._id ? updatedQuiz : quiz
        );
        setQuizzes(updatedQuizzes);
        setEditingQuizId(null); // Close the edit form
    };

    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/quiz/`);
                setQuizzes(response.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Quiz List</h2>
            <ul className="list-group">
                {quizzes.map((quiz, index1) => (
                    <li key={quiz._id} className="list-group-item">
                        {editingQuizId === quiz._id ? (
                            <EditQuiz quiz={quiz} onQuizUpdated={onQuizUpdated} />
                        ) : (
                            <>
                            <span className="fw-bold " style={{fontSize: '16px'}}>
                                {index1+1}) {quiz.question}
                                </span>
                                {quiz.answers.map((answer, index) => (
                                    <div key={index}>
                                        {index+1}) {answer} {quiz.correctAnswer === answer ? '(Correct Answer)' : ''}
                                    </div>
                                    ))}
                                {/* ... display answers ... */}
                                <div className='d-flex gap-3 mt-2'>
                                    <button className='btn btn-warning' onClick={() => handleEditClick(quiz._id)}>Edit Question</button>
                                    <button className='btn btn-danger' onClick={() => handleDelete(quiz._id)}>Delete Question</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;