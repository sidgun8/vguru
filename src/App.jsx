import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Adjust the path as needed
import Signup from './components/Signup'; // Adjust the path as needed
import Home from './components/Home';
import Dashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import axios from 'axios';
import WordMatchGame from './games/WordMatch';
import ShapeGame from './games/ShapeGame';
import ColorGame from './games/ColorMatch';
import Story from './components/Story';
import Quiz from './components/Quiz';
import MentorDashboard from './components/MentorDashboard';
import ParentDashboard from './components/ParentDashboard';

function App() {
  const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : 'https://vguru-server.vercel.app';

  const [user, setUser] = useState(null)
  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    try {
        const response = await axios.get(`${API_URL}/api/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        setUser(response.data);
    } catch (error) {
        console.error("Error fetching user data:", error.response);
    }}

  useEffect(() => {
    fetchUserDetails() 
  }, [])

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "What is 3 times 3?",
      answers: ["6", "9", "12", "15"],
      correctAnswer: "9"
    },
    {
      id: 3,
      question: "Is the Earth round?",
      answers: ["True", "False"],
      correctAnswer: "True"
    },
    {
      id: 4,
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars"
    },
    {
      id: 5,
      question: "What gas do plants breathe in that humans and animals breathe out?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide"
    }
  ];
  


  return (

    <BrowserRouter>
    <Navbar user={user}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={user?.role === 'student' ? <Dashboard /> : user?.role === 'mentor' ? <MentorDashboard /> : user?.role === 'parent' ? <ParentDashboard /> : <Navigate to="/" />} />
        <Route path='/game/wordmatch' element={<WordMatchGame />} />
        <Route path='/game/shapematch' element={<ShapeGame />} />
        <Route path='/game/colormatch' element={<ColorGame />} />
        <Route path='/story/:storyId' element={<Story />} />
        <Route path='/quiz' element={<Quiz questions={questions}/>} />
        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
