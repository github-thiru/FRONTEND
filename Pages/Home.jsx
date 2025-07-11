import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Welcome to the Portal</h1>
      <p>Select your role to proceed:</p>
      <button onClick={() => navigate('/admin/login')} style={{ margin: '10px' }}>
        Login as Admin
      </button>
      <button onClick={() => navigate('/user/register')} style={{ margin: '10px' }}>
        Register/Login as User
      </button>
    </div>
  );
}

export default Home;
