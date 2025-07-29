import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setOtpSent(true);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'OTP verification failed');
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const token = response.credential;
      if (!token) throw new Error('No credential received');

      // Send token to your backend for verification or user creation
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        tokenId: token,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/welcome');
    } catch (err: any) {
      console.error(err);
      setError('Google login failed');
    }
  };

  return (
  <div className="signup-container">
    <h2>Sign Up / Login</h2>

    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="signup-input"
    />

    {otpSent ? (
      <>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="signup-input"
        />
        <button onClick={handleVerifyOtp} className="signup-button">Verify OTP</button>
      </>
    ) : (
      <button onClick={handleSendOtp} className="signup-button">Send OTP</button>
    )}

    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => setError('Google login failed')}
      />
    </div>

    {error && <p className="signup-error">{error}</p>}
  </div>
);

}

export default SignupPage;

