import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard';
import QuizList from './QuizList';
import CreateQuiz from './CreateQuiz';

const MentorDashboard = () => {
    const [tests, setTests] = useState([])
    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';

    useEffect(() => {
        const fetchTests = async () => {
          const response = await axios.get(`${API_URL}/api/test`)
          setTests(response.data)
          setTests(response.data)
        }
        fetchTests()
    }, [])

    const [review, setReview] = useState('')

    const [currentSection, setCurrentSection] = useState('Review and Approve')
    const navItems = [
      "Review and Approve",
      "Already Reviewed",
      "Create Question",
      "Quiz List"
    ]
  return (
    <div className='container mt-5'>

<h1 className='text-center text-md-start mb-3' style={{color: '#007bff', textTransform: 'uppercase', fontWeight: 'bold'}}>Mentor Dashboard</h1>

<div className=' bg-secondary d-flex justify-content-start gap-5 py-2 px-5 mb-5'>

  { navItems.map((item, index) => {
    return <span key={index} onClick={() => setCurrentSection(item)} role='button' className={`${currentSection === item && 'text-warning'}`}>{item}</span>
  })}
</div>

{ currentSection === 'Review and Approve' &&
<div className='container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start', gap: '20px'}}>
        {tests.map((test, index) => {
            
            return (
                test.reviewed === false &&
                <ReviewCard key={index} test={test} index={index}/>
        )})}

</div>
}


{ currentSection === 'Already Reviewed' &&
<div className='container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start', gap: '20px'}}>
        {tests.map((test, index) => {
            
            return (
                test.reviewed === true &&
                <ReviewCard key={index} test={test} index={index}/>
        )})}

</div>
}

{ currentSection === 'Create Question' &&
<CreateQuiz />
}

{ currentSection === 'Quiz List' &&
<QuizList />
}

    </div>
  )
}

export default MentorDashboard