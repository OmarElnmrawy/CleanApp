import React, { useEffect, useState } from 'react';

const History = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(
        'http://localhost:5000/api/uploads/my-history',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'token'
            )}`,
          },
        }
      );

      const data = await res.json();
      setUploads(data);
    };

    fetchHistory();
  }, []);

  return (
    <div style={containerStyle}>
      {/* Background */}
      <div style={bgCircle1}></div>
      <div style={bgCircle2}></div>

      <div style={contentWrapper}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={badgeStyle}>
            📜 Activity Log
          </div>

          <h1 style={titleStyle}>
            Submission History
          </h1>

          <p style={subtitleStyle}>
            Track your eco actions and rewards.
          </p>
        </div>

        {/* Empty State */}
        {uploads.length === 0 ? (
          <div style={emptyCard}>
            <div style={emptyIcon}>🌱</div>

            <h2 style={emptyTitle}>
              No submissions yet
            </h2>

            <p style={emptyText}>
              Start uploading clean campus proof to
              earn points and build your eco profile.
            </p>
          </div>
        ) : (
          <div style={listContainer}>
            {uploads.map((u) => (
              <div
                key={u._id}
                style={historyCard}
              >


                {/* Info */}
                <div style={infoStyle}>
                  <div style={row}>
                    <span style={label}>
                      Date:
                    </span>
                    <span style={value}>
                      {new Date(
                        u.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={row}>
                    <span style={label}>
                      Status:
                    </span>

                    <span
                      style={{
                        ...statusStyle,
                        color:
                          u.status ===
                          'approved'
                            ? '#2d6a4f'
                            : u.status ===
                              'declined'
                            ? '#bc4749'
                            : '#f39c12',
                      }}
                    >
                      {u.status.toUpperCase()}
                    </span>
                  </div>

                  {u.status === 'approved' && (
                    <div style={pointsEarned}>
                      ✨ +{u.pointsAwarded}{' '}
                      Points
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
  background: 'rgba(82,183,136,0.15)',
  top: '-100px',
  left: '-100px',
  filter: 'blur(30px)',
};

const bgCircle2 = {
  position: 'absolute',
  width: '280px',
  height: '280px',
  borderRadius: '50%',
  background: 'rgba(45,106,79,0.15)',
  bottom: '-100px',
  right: '-100px',
  filter: 'blur(30px)',
};

const contentWrapper = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '900px',
  margin: '0 auto',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '35px',
};

const badgeStyle = {
  display: 'inline-block',
  padding: '10px 18px',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.4)',
  color: '#2d6a4f',
  fontWeight: '600',
  marginBottom: '18px',
};

const titleStyle = {
  color: '#1b4332',
  fontSize: '2.7rem',
  marginBottom: '10px',
  fontWeight: '700',
};

const subtitleStyle = {
  color: '#52796f',
  fontSize: '1rem',
};

const listContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const historyCard = {
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
  padding: '18px',
  borderRadius: '24px',
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow:
    '0 10px 25px rgba(0,0,0,0.05)',
};

const imgStyle = {
  width: '90px',
  height: '90px',
  objectFit: 'cover',
  borderRadius: '18px',
  boxShadow: '0 8px 18px rgba(0,0,0,0.1)',
  flexShrink: 0,
};

const infoStyle = {
  textAlign: 'left',
  flex: 1,
};

const row = {
  display: 'flex',
  gap: '8px',
  marginBottom: '6px',
};

const label = {
  fontWeight: '600',
  color: '#52796f',
};

const value = {
  color: '#1b4332',
  fontWeight: '500',
};

const statusStyle = {
  fontWeight: '800',
  letterSpacing: '1px',
};

const pointsEarned = {
  marginTop: '8px',
  color: '#2d6a4f',
  fontWeight: '700',
};

const emptyCard = {
  textAlign: 'center',
  padding: '50px 30px',
  background: 'rgba(255,255,255,0.72)',
  borderRadius: '28px',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.4)',
};

const emptyIcon = {
  fontSize: '60px',
  marginBottom: '15px',
};

const emptyTitle = {
  color: '#1b4332',
  marginBottom: '10px',
};

const emptyText = {
  color: '#52796f',
  lineHeight: '1.6',
};

export default History;