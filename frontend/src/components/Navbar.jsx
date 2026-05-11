import React from 'react';
import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const isAdmin =
    localStorage.getItem('isAdmin') === 'true';

  if (
    !token ||
    location.pathname === '/login' ||
    location.pathname === '/register'
  )
    return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div style={logoContainer}>
        <div style={logoIcon}>🌿</div>

        <div>
          <h2 style={logoText}>CleanE-JUST</h2>
          <p style={logoSubtext}>
            Eco Smart Campus
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={linksContainer}>
        <Link to="/home" style={linkStyle}>
          Home
        </Link>

        {!isAdmin && (
          <>
            <Link
              to="/history"
              style={linkStyle}
            >
              My History
            </Link>

            <Link
              to="/game"
              style={specialLink}
            >
              🎡 Spin
            </Link>

            <Link
              to="/redeem"
              style={rewardLink}
            >
              🎁 Rewards
            </Link>
          </>
        )}

        {isAdmin && (
          <>
            <Link
              to="/admin"
              style={adminLinkStyle}
            >
              🛡️ Approvals
            </Link>

            <Link
              to="/admin-redeem"
              style={prizeCenterStyle}
            >
              🎁 Prize Center
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          style={logoutBtn}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

/* ---------------- STYLES ---------------- */

const navStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 40px',
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderBottom:
    '1px solid rgba(255,255,255,0.35)',
  boxShadow:
    '0 8px 25px rgba(0,0,0,0.04)',
  fontFamily: "'Poppins', sans-serif",
};

const logoContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
};

const logoIcon = {
  width: '52px',
  height: '52px',
  borderRadius: '18px',
  background:
    'linear-gradient(135deg, #d8f3dc, #b7e4c7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '26px',
  boxShadow:
    '0 6px 18px rgba(82,183,136,0.2)',
};

const logoText = {
  margin: 0,
  color: '#1b4332',
  fontSize: '1.3rem',
  fontWeight: '700',
};

const logoSubtext = {
  margin: 0,
  fontSize: '0.75rem',
  color: '#52796f',
};

const linksContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#2d6a4f',
  fontWeight: '600',
  padding: '10px 16px',
  borderRadius: '12px',
  transition: '0.3s',
};

const specialLink = {
  ...linkStyle,
  background: 'rgba(255,255,255,0.6)',
  border: '1px solid #d8f3dc',
};

const rewardLink = {
  ...linkStyle,
  background:
    'linear-gradient(135deg, #d8f3dc, #b7e4c7)',
};

const adminLinkStyle = {
  textDecoration: 'none',
  color: '#f4b400',
  fontWeight: '700',
  padding: '10px 16px',
  borderRadius: '14px',
  border: '1px solid rgba(244,180,0,0.35)',
  background: 'rgba(255,248,220,0.7)',
};

const prizeCenterStyle = {
  textDecoration: 'none',
  color: '#3b82f6',
  fontWeight: '700',
  padding: '10px 16px',
  borderRadius: '14px',
  border: '1px solid rgba(59,130,246,0.25)',
  background: 'rgba(239,246,255,0.75)',
};

const logoutBtn = {
  border: 'none',
  padding: '12px 18px',
  borderRadius: '14px',
  background:
    'linear-gradient(135deg, #d00000, #e63946)',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
  boxShadow:
    '0 8px 18px rgba(230,57,70,0.25)',
  transition: '0.3s',
};

export default Navbar;