import React, { useState } from 'react';
import axios from 'axios';

const ReviewCard = ({ test, index }) => {
    const [review, setReview] = useState('');
    const testDate = new Date(test.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';

    const handleReviewSubmit = async () => {
        try{
            const res = await axios.put(`${API_URL}/api/test/${test._id}`, {
                remarks: review,
                reviewed: true  
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res)
            window.location = '/'
        }
        catch(err){
            console.log(err)
        }
        
    };

    return (
        <div key={test._id} className="card mb-3 px-2" style={{height: 'fit-content'}}>
            <div className="card-body">
                <h5 className="card-title">Test #{index + 1}</h5>
                <p className="card-text">
                    <strong>Test given on:</strong> {testDate}<br />
                    <strong>Student:</strong> {test.student.name}<br />
                    <strong>Test Name:</strong> {test.testType}<br />
                    <strong>Test Score:</strong> {test.marks}<br />
                    { test.reviewed &&
                    <div>
                    <strong>Reviewed:</strong> <span> {test.reviewed ? 'Yes' : 'No'}</span>
                    </div>
}
                </p>
                { !test.reviewed &&
                <div>
                <hr />
                <div className="mb-3">
                    <label htmlFor="remarks" className="form-label">Remarks:</label>
                    <input type="text" className="form-control" id="remarks" value={review} onChange={(e) => setReview(e.target.value)} />
                </div>
                <button onClick={handleReviewSubmit} className="btn btn-primary">Review</button>
                </div>
} 
            </div>
        </div>
    );
}

export default ReviewCard;
