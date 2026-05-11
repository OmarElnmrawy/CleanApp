import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', data.isAdmin.toString());

        navigate('/home');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Cannot connect to server. Is your backend running?');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Background Glow */}
      <div style={backgroundCircle1}></div>
      <div style={backgroundCircle2}></div>

      <form onSubmit={handleLogin} style={formStyle}>
        <div style={logoStyle}>🌿</div>

        <h1 style={titleStyle}>Clean EJ</h1>
        <p style={subtitleStyle}>
           •  For Clean Campus •
        </p>

        <div style={inputGroup}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="student@ejust.edu.eg"
          />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.target.style.transform = 'translateY(-2px)')
          }
          onMouseOut={(e) =>
            (e.target.style.transform = 'translateY(0px)')
          }
        >
          Login
        </button>

        <p style={footerText}>
          Don&apos;t have an account?
          <span
            onClick={() => navigate('/register')}
            style={registerStyle}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const containerStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background:
    'linear-gradient(135deg, #eefbf3 0%, #d8f3dc 45%, #b7e4c7 100%)',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "'Poppins', sans-serif",
};

const backgroundCircle1 = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  borderRadius: '50%',
  background: 'rgba(82, 183, 136, 0.18)',
  top: '-80px',
  left: '-80px',
  filter: 'blur(30px)',
};

const backgroundCircle2 = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'rgba(46, 139, 87, 0.18)',
  bottom: '-80px',
  right: '-80px',
  filter: 'blur(30px)',
};

const formStyle = {
  width: '100%',
  maxWidth: '400px',
  padding: '45px',
  borderRadius: '28px',
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
  border: '1px solid rgba(255,255,255,0.4)',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
};

const logoStyle = {
  fontSize: '42px',
  marginBottom: '8px',
};

const titleStyle = {
  margin: 0,
  fontSize: '34px',
  fontWeight: '700',
  color: '#1b4332',
};

const subtitleStyle = {
  color: '#52796f',
  fontSize: '14px',
  marginBottom: '35px',
  marginTop: '8px',
};

const inputGroup = {
  marginBottom: '20px',
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#2d6a4f',
  fontWeight: '600',
  fontSize: '14px',
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '14px',
  border: '1px solid rgba(82, 183, 136, 0.25)',
  background: 'rgba(255,255,255,0.85)',
  outline: 'none',
  fontSize: '15px',
  transition: '0.3s ease',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  border: 'none',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
  color: 'white',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.3s ease',
  marginTop: '10px',
  boxShadow: '0 8px 20px rgba(82, 183, 136, 0.35)',
};

const footerText = {
  marginTop: '24px',
  color: '#52796f',
  fontSize: '14px',
};

const registerStyle = {
  color: '#2d6a4f',
  fontWeight: '700',
  marginLeft: '6px',
  cursor: 'pointer',
};

export default Login;