import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Welcome to NoteKeeper!</h1>
        <p>
          A simple and secure way to manage your personal notes. Sign up or log in to start
          writing and organizing your thoughts anytime, anywhere.
        </p>
        <ul>
          <li>🔐 Secure Authentication</li>
          <li>📝 Add & Delete Notes</li>
          <li>👤 Personalized Dashboard</li>
        </ul>
        <button className="next-button" onClick={() => navigate('/dashboard')}>
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
