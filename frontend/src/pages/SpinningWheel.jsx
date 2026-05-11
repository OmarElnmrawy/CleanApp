import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpinningWheel = () => {
  const navigate = useNavigate();

  const [isSpinning, setIsSpinning] =
    useState(false);

  const [prize, setPrize] = useState(null);

  const [rotation, setRotation] = useState(0);

  const prizes = [
    {
      name: '🎟️ Voucher 40 LE',
      color: '#1b4332',
    },
    {
      name: '🍫 Chocolate',
      color: '#2d6a4f',
    },
    {
      name: '☕ Coffee Disc.',
      color: '#40916c',
    },
    {
      name: '🍭 Sweet Treats',
      color: '#52b788',
    },
  ];

  const handleSpin = async () => {
    if (isSpinning) return;

    try {
      const res = await fetch(
        'http://localhost:5000/api/game/spin',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'token'
            )}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      const extraRotation =
        Math.floor(Math.random() * 360) +
        1800;

      const newRotation =
        rotation + extraRotation;

      setRotation(newRotation);
      setIsSpinning(true);
      setPrize(null);

      setTimeout(() => {
        setIsSpinning(false);
        setPrize(data.prize);

        setTimeout(() => {
          if (
            window.confirm(
              `🎉 You won: ${data.prize}!\n\nCheck your Rewards page?`
            )
          ) {
            navigate('/redeem');
          }
        }, 500);
      }, 4000);
    } catch (err) {
      alert(
        'Spin failed. Check your connection.'
      );
    }
  };

  return (
    <div style={containerStyle}>
      {/* Background Glow */}
      <div style={bgCircle1}></div>
      <div style={bgCircle2}></div>

      <div style={contentWrapper}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={badgeStyle}>
            🎡 Lucky Rewards
          </div>

          <h1 style={titleStyle}>
            E-JUST Lucky Wheel
          </h1>

          <p style={subtitleStyle}>
            Spend{' '}
            <span style={highlightText}>
              30 Points
            </span>{' '}
            for a guaranteed eco reward.
          </p>
        </div>

        {/* Wheel */}
        <div style={wheelWrapper}>
          <div style={outerGlow}></div>

          <div style={pointer}></div>

          <div
            style={{
              ...wheelStyle,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {prizes.map((p, i) => (
              <div
                key={i}
                style={{
                  ...segmentLabel,
                  transform: `rotate(${
                    i * 90 + 45
                  }deg)`,
                }}
              >
                <span
                  style={{
                    transform: 'rotate(45deg)',
                  }}
                >
                  {p.name.split(' ')[0]}
                </span>
              </div>
            ))}

            <div style={wheelCenter}>
              <div style={centerInner}>
                GO
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          style={
            isSpinning
              ? disabledBtn
              : spinBtn
          }
        >
          {isSpinning
            ? '🎰 SPINNING...'
            : '🔥 SPIN NOW'}
        </button>

        {/* Prize Popup */}
        {prize && !isSpinning && (
          <div style={prizePopup}>
            <div style={prizeIcon}>
              🎉
            </div>

            <h2 style={popupTitle}>
              Big Win!
            </h2>

            <p style={prizeText}>
              {prize}
            </p>

            <button
              onClick={() =>
                navigate('/redeem')
              }
              style={miniRedeemBtn}
            >
              View My Rewards
            </button>
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
  textAlign: 'center',
};

const headerStyle = {
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
  marginBottom: '20px',
};

const titleStyle = {
  color: '#1b4332',
  fontSize: '3rem',
  marginBottom: '12px',
  fontWeight: '700',
};

const subtitleStyle = {
  color: '#52796f',
  fontSize: '1.1rem',
};

const highlightText = {
  color: '#2d6a4f',
  fontWeight: '700',
};

const wheelWrapper = {
  position: 'relative',
  width: '380px',
  height: '380px',
  margin: '0 auto 40px',
};

const outerGlow = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  background:
    'rgba(82,183,136,0.15)',
  filter: 'blur(25px)',
  transform: 'scale(1.08)',
};

const wheelStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: '14px solid rgba(255,255,255,0.85)',
  background:
    'conic-gradient(#1b4332 0deg 90deg, #2d6a4f 90deg 180deg, #40916c 180deg 270deg, #52b788 270deg 360deg)',
  transition:
    'transform 4s cubic-bezier(0.15, 0, 0.15, 1)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow:
    '0 15px 40px rgba(0,0,0,0.12)',
  backdropFilter: 'blur(10px)',
};

const segmentLabel = {
  position: 'absolute',
  width: '50%',
  height: '50%',
  left: '50%',
  top: '50%',
  transformOrigin: '0% 0%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  paddingBottom: '120px',

  color: 'white',
  fontWeight: '700',
  fontSize: '42px',

  textShadow:
    '0 4px 12px rgba(0,0,0,0.28)',

  userSelect: 'none',
  letterSpacing: '1px',
};

const wheelCenter = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95px',
  height: '95px',
  borderRadius: '50%',
  background:
    'rgba(255,255,255,0.18)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow:
    '0 8px 25px rgba(0,0,0,0.15)',
  zIndex: 5,
};

const centerInner = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
  background:
    'linear-gradient(135deg, #1b4332, #2d6a4f)',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '700',
  fontSize: '1.1rem',
};

const pointer = {
  position: 'absolute',
  top: '-25px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '0',
  height: '0',
  borderLeft: '22px solid transparent',
  borderRight: '22px solid transparent',
  borderTop: '45px solid #e63946',
  zIndex: 10,
  filter:
    'drop-shadow(0 4px 10px rgba(0,0,0,0.15))',
};

const spinBtn = {
  padding: '18px 65px',
  border: 'none',
  borderRadius: '999px',
  background:
    'linear-gradient(135deg, #2d6a4f, #52b788)',
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: '700',
  cursor: 'pointer',
  boxShadow:
    '0 12px 28px rgba(82,183,136,0.35)',
  transition: '0.3s',
};

const disabledBtn = {
  ...spinBtn,
  background: '#adb5bd',
  cursor: 'not-allowed',
  boxShadow: 'none',
  transform: 'scale(0.96)',
};

const prizePopup = {
  marginTop: '40px',
  display: 'inline-block',
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(18px)',
  borderRadius: '30px',
  padding: '35px',
  minWidth: '320px',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow:
    '0 15px 35px rgba(0,0,0,0.08)',
};

const prizeIcon = {
  fontSize: '55px',
  marginBottom: '10px',
};

const popupTitle = {
  color: '#1b4332',
  marginBottom: '10px',
};

const prizeText = {
  color: '#2d6a4f',
  fontSize: '1.3rem',
  fontWeight: '700',
  marginBottom: '25px',
};

const miniRedeemBtn = {
  border: 'none',
  padding: '14px 24px',
  borderRadius: '16px',
  background:
    'linear-gradient(135deg, #1b4332, #2d6a4f)',
  color: 'white',
  fontWeight: '700',
  cursor: 'pointer',
  boxShadow:
    '0 8px 18px rgba(45,106,79,0.25)',
};

export default SpinningWheel;