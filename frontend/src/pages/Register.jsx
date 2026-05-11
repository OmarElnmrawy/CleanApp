import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:5000/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Registration Successful!');
        navigate('/login');
      } else {
        alert(
          data.message || 'Registration failed'
        );
      }
    } catch (err) {
      alert('Cannot connect to server.');
    }
  };

  return (
    <div style={containerStyle}>
      {/* background effects */}
      <div style={bgCircle1}></div>
      <div style={bgCircle2}></div>

      <form
        onSubmit={handleRegister}
        style={cardStyle}
      >
        <div style={logo}>🌿</div>

        <h1 style={titleStyle}>Join CleanE-JUST</h1>
        <p style={subtitleStyle}>
          Create your eco account and start earning rewards
        </p>

        {/* Name */}
        <div style={inputGroup}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
            placeholder="Khaled Nabil"
            required
          />
        </div>

        {/* Email */}
        <div style={inputGroup}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
            placeholder="student@ejust.edu.eg"
            required
          />
        </div>

        {/* Password */}
        <div style={inputGroup}>
          <label style={labelStyle}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Create Account
        </button>

        <p style={footerText}>
          Already have an account?
          <span
            onClick={() => navigate('/login')}
            style={linkText}
          >
            Login here
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
  fontFamily: "'Poppins', sans-serif",
  background:
    'linear-gradient(135deg, #eefbf3 0%, #d8f3dc 45%, #b7e4c7 100%)',
  position: 'relative',
  overflow: 'hidden',
};

const bgCircle1 = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  borderRadius: '50%',
  background: 'rgba(82,183,136,0.15)',
  top: '-100px',
  left: '-100px',
  filter: 'blur(30px)',
};

const bgCircle2 = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'rgba(45,106,79,0.15)',
  bottom: '-100px',
  right: '-100px',
  filter: 'blur(30px)',
};

const cardStyle = {
  width: '100%',
  maxWidth: '420px',
  padding: '45px',
  borderRadius: '28px',
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
};

const logo = {
  fontSize: '42px',
  marginBottom: '10px',
};

const titleStyle = {
  margin: 0,
  fontSize: '28px',
  fontWeight: '700',
  color: '#1b4332',
};

const subtitleStyle = {
  marginTop: '8px',
  marginBottom: '30px',
  fontSize: '14px',
  color: '#52796f',
};

const inputGroup = {
  textAlign: 'left',
  marginBottom: '16px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '600',
  color: '#2d6a4f',
  fontSize: '14px',
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '14px',
  border: '1px solid rgba(82,183,136,0.25)',
  background: 'rgba(255,255,255,0.85)',
  outline: 'none',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  padding: '15px',
  marginTop: '10px',
  border: 'none',
  borderRadius: '16px',
  background:
    'linear-gradient(135deg, #2d6a4f, #52b788)',
  color: 'white',
  fontWeight: '700',
  fontSize: '15px',
  cursor: 'pointer',
  boxShadow:
    '0 10px 25px rgba(82,183,136,0.35)',
};

const footerText = {
  marginTop: '20px',
  fontSize: '14px',
  color: '#52796f',
};

const linkText = {
  marginLeft: '6px',
  color: '#2d6a4f',
  fontWeight: '700',
  cursor: 'pointer',
};

export default Register;