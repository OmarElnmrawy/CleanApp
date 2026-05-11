// ONLY UI/STYLING CHANGED
// Your logic remains exactly the same

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({
    username: 'Student',
    points: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users/me',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'token'
            )}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file)
      return alert(
        'Please select a photo of the rubbish first!'
      );

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(
        'http://localhost:5000/api/uploads',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'token'
            )}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert(
          'Success! Your proof has been sent for verification.'
        );
        setFile(null);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Connection error. Is the server running?');
    }
  };

  if (loading)
    return (
      <div style={loadingStyle}>
        Loading your eco dashboard...
      </div>
    );

  return (
    <div style={containerStyle}>
      {/* Background Blur Effects */}
      <div style={bgCircle1}></div>
      <div style={bgCircle2}></div>

      <div style={contentStyle}>
        {/* Header */}
        <div style={welcomeHeader}>
          <div style={badgeStyle}>🌿 Eco Dashboard</div>

          <h1 style={titleStyle}>
            Welcome back, {userData.username}
          </h1>

          <p style={subtitleStyle}>
            Every clean action makes the campus greener.
          </p>
        </div>

        {/* Points Card */}
        <div style={pointsCard}>
          <div>
            <p style={pointsLabel}>Available Balance</p>
            <h2 style={pointsAmount}>
              ⭐ {userData.points}
            </h2>
          </div>

          <div style={leafIcon}>🍃</div>
        </div>

        {/* Upload Section */}
        <div style={uploadBox}>
          <div style={uploadIcon}>📸</div>

          <h3 style={uploadTitle}>
            Upload Cleanup Proof
          </h3>

          <p style={uploadText}>
            Submit a clear image of litter disposal and
            earn eco reward points after verification.
          </p>

          <div style={inputWrapper}>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept="image/*"
              style={hiddenInput}
            />

            <label
              htmlFor="file-upload"
              style={fileLabelBtn}
            >
              {file ? 'Change Photo' : 'Choose Photo'}
            </label>

            {file && (
              <div style={selectedFileBox}>
                <span style={{ fontSize: '18px' }}>✅</span>
                <span>{file.name}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            style={
              file
                ? submitBtnActive
                : submitBtnDisabled
            }
            disabled={!file}
          >
            Submit for Review
          </button>
        </div>

        {/* Footer */}
        <div style={footerCard}>
          <span style={{ fontSize: '18px' }}>📈</span>
          Track all your uploads and rewards in
          <strong> My History</strong>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const containerStyle = {
  minHeight: '100vh',
  padding: '50px 20px',
  background:
    'linear-gradient(135deg, #eefbf3 0%, #d8f3dc 45%, #b7e4c7 100%)',
  fontFamily: "'Poppins', sans-serif",
  position: 'relative',
  overflow: 'hidden',
};

const bgCircle1 = {
  position: 'absolute',
  width: '350px',
  height: '350px',
  borderRadius: '50%',
  background: 'rgba(82, 183, 136, 0.15)',
  top: '-100px',
  left: '-100px',
  filter: 'blur(30px)',
};

const bgCircle2 = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'rgba(45, 106, 79, 0.15)',
  bottom: '-100px',
  right: '-100px',
  filter: 'blur(30px)',
};

const loadingStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  fontFamily: "'Poppins', sans-serif",
  color: '#1b4332',
  background:
    'linear-gradient(135deg, #eefbf3 0%, #d8f3dc 100%)',
};

const contentStyle = {
  maxWidth: '650px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
};

const welcomeHeader = {
  textAlign: 'center',
  marginBottom: '30px',
};

const badgeStyle = {
  display: 'inline-block',
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(10px)',
  padding: '10px 18px',
  borderRadius: '999px',
  color: '#2d6a4f',
  fontWeight: '600',
  marginBottom: '20px',
  border: '1px solid rgba(255,255,255,0.4)',
};

const titleStyle = {
  color: '#1b4332',
  fontSize: '2.5rem',
  marginBottom: '10px',
  fontWeight: '700',
};

const subtitleStyle = {
  color: '#52796f',
  fontSize: '1rem',
};

const pointsCard = {
  background:
    'linear-gradient(135deg, rgba(45,106,79,0.95), rgba(82,183,136,0.9))',
  borderRadius: '28px',
  padding: '30px',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  boxShadow: '0 15px 35px rgba(45,106,79,0.25)',
  backdropFilter: 'blur(12px)',
};

const pointsLabel = {
  margin: 0,
  opacity: 0.85,
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const pointsAmount = {
  margin: '10px 0 0 0',
  fontSize: '3rem',
  fontWeight: '700',
};

const leafIcon = {
  fontSize: '55px',
};

const uploadBox = {
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(18px)',
  padding: '45px',
  borderRadius: '30px',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow:
    '0 10px 30px rgba(0,0,0,0.06)',
  textAlign: 'center',
};

const uploadIcon = {
  width: '90px',
  height: '90px',
  background:
    'linear-gradient(135deg, #d8f3dc, #b7e4c7)',
  borderRadius: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '42px',
  margin: '0 auto 25px',
};

const uploadTitle = {
  color: '#1b4332',
  fontSize: '1.6rem',
  marginBottom: '12px',
};

const uploadText = {
  color: '#52796f',
  marginBottom: '30px',
  lineHeight: '1.6',
};

const inputWrapper = {
  marginBottom: '25px',
};

const hiddenInput = {
  display: 'none',
};

const fileLabelBtn = {
  display: 'inline-block',
  padding: '14px 28px',
  background: 'rgba(255,255,255,0.85)',
  border: '1px solid #d8f3dc',
  borderRadius: '16px',
  cursor: 'pointer',
  color: '#2d6a4f',
  fontWeight: '600',
  transition: '0.3s',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
};

const selectedFileBox = {
  marginTop: '18px',
  background: '#eefbf3',
  borderRadius: '14px',
  padding: '14px',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#2d6a4f',
  fontWeight: '500',
};

const submitBtnActive = {
  width: '100%',
  padding: '16px',
  border: 'none',
  borderRadius: '18px',
  background:
    'linear-gradient(135deg, #2d6a4f, #52b788)',
  color: 'white',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: 'pointer',
  boxShadow:
    '0 10px 25px rgba(82,183,136,0.35)',
  transition: '0.3s',
};

const submitBtnDisabled = {
  ...submitBtnActive,
  background: '#adb5bd',
  cursor: 'not-allowed',
  boxShadow: 'none',
};

const footerCard = {
  marginTop: '25px',
  background: 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(10px)',
  padding: '18px',
  borderRadius: '18px',
  textAlign: 'center',
  color: '#52796f',
  border: '1px solid rgba(255,255,255,0.4)',
};

export default Home;