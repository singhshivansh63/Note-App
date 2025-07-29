import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleLogin() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/google-login', {
          tokenId: tokenResponse.access_token, // ✅ Use access_token
        });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } catch (err) {
        alert('Google login failed');
      }
    },
    onError: () => {
      alert('Login Failed');
    },
    scope: 'profile email',
    flow: 'implicit',
  });

  return (
    <button onClick={() => login()}>
      Sign in with Google
    </button>
  );
}

export default GoogleLogin;

