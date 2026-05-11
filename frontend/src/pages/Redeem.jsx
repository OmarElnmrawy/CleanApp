import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const Redeem = () => {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate(); // 2. Initialize the hook

  const fetchInventory = async () => {
    const res = await fetch(
      'http://localhost:5000/api/users/me',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const data = await res.json();

    setInventory(
      data.inventory.filter((item) => !item.isUsed)
    );
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleUseItem = async (itemId) => {
    if (!window.confirm('Show this to the cashier to redeem. Proceed?')) return;

    await fetch(
      `http://localhost:5000/api/game/use-item/${itemId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    fetchInventory();
  };

  return (
    <div style={containerStyle}>
      <div style={bgCircle1}></div>
      <div style={bgCircle2}></div>

      <div style={contentWrapper}>
        <div style={headerStyle}>
          <div style={badgeStyle}>🎁 Rewards Center</div>
          <h1 style={titleStyle}>My Rewards</h1>
          <p style={subtitleStyle}>
            Redeem your eco rewards and enjoy your achievements.
          </p>
        </div>

        {inventory.length === 0 ? (
          <div style={emptyCard}>
            <div style={emptyIcon}>🎡</div>
            <h2 style={emptyTitle}>No rewards yet</h2>
            <p style={emptyText}>
              Spin the wheel and earn exciting prizes by keeping the campus clean.
            </p>
            {/* 3. Add the onClick handler here */}
            <button 
              style={spinBtn} 
              onClick={() => navigate('/game')}
            >
              Go Spin The Wheel
            </button>
          </div>
        ) : (
          <div style={gridStyle}>
            {inventory.map((item) => (
              <div key={item._id} style={prizeCard}>
                <div style={cardGlow}></div>
                <div style={giftIcon}>🎁</div>
                <h2 style={prizeTitle}>{item.item}</h2>
                <div style={expiryBox}>
                  ⏳ Expires:{' '}
                  {new Date(item.expiryDate).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleUseItem(item._id)}
                  style={redeemBtn}
                >
                  Redeem Reward
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* Styles remain exactly the same as you provided */
const containerStyle = { minHeight: '100vh', padding: '50px 25px', background: 'linear-gradient(135deg, #eefbf3 0%, #d8f3dc 45%, #b7e4c7 100%)', fontFamily: "'Poppins', sans-serif", position: 'relative', overflow: 'hidden' };
const bgCircle1 = { position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(82,183,136,0.15)', top: '-100px', left: '-100px', filter: 'blur(30px)' };
const bgCircle2 = { position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(45,106,79,0.15)', bottom: '-100px', right: '-100px', filter: 'blur(30px)' };
const contentWrapper = { position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' };
const headerStyle = { textAlign: 'center', marginBottom: '45px' };
const badgeStyle = { display: 'inline-block', padding: '10px 18px', borderRadius: '999px', background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)', color: '#2d6a4f', fontWeight: '600', marginBottom: '18px', border: '1px solid rgba(255,255,255,0.4)' };
const titleStyle = { fontSize: '3rem', color: '#1b4332', marginBottom: '12px', fontWeight: '700' };
const subtitleStyle = { color: '#52796f', fontSize: '1rem' };
const gridStyle = { display: 'grid', gap: '28px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' };
const prizeCard = { position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(18px)', borderRadius: '30px', padding: '35px 28px', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 12px 30px rgba(0,0,0,0.06)', textAlign: 'center' };
const cardGlow = { position: 'absolute', width: '120px', height: '120px', background: 'rgba(255,215,0,0.12)', borderRadius: '50%', top: '-30px', right: '-30px', filter: 'blur(15px)' };
const giftIcon = { width: '90px', height: '90px', margin: '0 auto 22px', borderRadius: '24px', background: 'linear-gradient(135deg, #d8f3dc, #b7e4c7)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '42px', boxShadow: '0 10px 20px rgba(82,183,136,0.18)' };
const prizeTitle = { color: '#1b4332', marginBottom: '18px', fontSize: '1.5rem' };
const expiryBox = { background: '#eefbf3', color: '#2d6a4f', padding: '12px', borderRadius: '14px', marginBottom: '25px', fontWeight: '500' };
const redeemBtn = { width: '100%', padding: '15px', border: 'none', borderRadius: '18px', background: 'linear-gradient(135deg, #2d6a4f, #52b788)', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(82,183,136,0.35)', transition: '0.3s' };
const emptyCard = { maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(18px)', borderRadius: '32px', padding: '50px 35px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' };
const emptyIcon = { fontSize: '70px', marginBottom: '20px' };
const emptyTitle = { color: '#1b4332', marginBottom: '14px' };
const emptyText = { color: '#52796f', lineHeight: '1.7', marginBottom: '28px' };
const spinBtn = { padding: '15px 30px', borderRadius: '18px', border: 'none', background: 'linear-gradient(135deg, #2d6a4f, #52b788)', color: 'white', fontWeight: '700', cursor: 'pointer', boxShadow: '0 10px 25px rgba(82,183,136,0.35)' };

export default Redeem;