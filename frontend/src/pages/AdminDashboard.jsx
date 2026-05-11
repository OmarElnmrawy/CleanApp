import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/uploads/pending', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (res.ok) setPendingItems(data);
    } catch (err) {
      console.error("Failed to fetch pending items", err);
    }
  };

  const handleDecision = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/uploads/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        // This "transfers" it out of the UI by filtering it out of the state
        setPendingItems(prev => prev.filter(item => item._id !== id));
        alert(`Submission ${status} successfully!`);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Connection error.");
    }
  };

  return (
    <div style={adminContainer}>
      <header style={headerStyle}>
        <h1 style={{ color: '#1b4332', margin: 0 }}>🛡️ Admin Review Portal</h1>
        <p style={{ color: '#2d6a4f' }}>Review submissions to award points for campus cleanliness.</p>
      </header>

      <div style={listStyle}>
        {pendingItems.map((item) => (
          <div key={item._id} style={bigCardStyle}>
            {/* LARGE IMAGE SECTION */}
            <div style={imageWrapper}>
              <img 
                src={`http://localhost:5000/uploads/${item.imageUrl.split(/[\\/]/).pop()}`} 
                alt="Proof" 
                style={bigImgStyle} 
                onError={(e) => console.log("Failed URL:", e.target.src)}
                />
            </div>

            {/* DETAILS SECTION */}
            <div style={infoSection}>
              <div style={userDetails}>
                <p style={userText}>👤 <b>User:</b> {item.user?.username || "Unknown"}</p>
                <p style={dateText}>📅 <b>Uploaded:</b> {new Date(item.createdAt).toLocaleString()}</p>
              </div>
              
              <div style={btnGroup}>
                <button 
                  onClick={() => handleDecision(item._id, 'approved')} 
                  style={approveBtn}>✅ Approve & Add Points
                </button>
                <button 
                  onClick={() => handleDecision(item._id, 'declined')} 
                  style={declineBtn}>❌ Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {pendingItems.length === 0 && (
        <div style={emptyState}>
          <p style={{ fontSize: '24px' }}>All caught up! No pending reviews. 😎</p>
          <button onClick={fetchPending} style={refreshBtn}>Refresh List</button>
        </div>
      )}
    </div>
  );
};

// --- UPDATED STYLES FOR BETTER VISIBILITY ---
const adminContainer = { padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' };
const headerStyle = { textAlign: 'center', marginBottom: '40px' };
const listStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' };

const bigCardStyle = { 
  width: '100%', 
  maxWidth: '700px', // Much wider than before
  background: 'white', 
  borderRadius: '20px', 
  overflow: 'hidden', 
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column'
};

const imageWrapper = { 
  width: '100%', 
  height: '450px', // Tall enough to see everything clearly
  backgroundColor: '#1a1a1a', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const bigImgStyle = { 
  width: '100%', 
  height: '100%', 
  objectFit: 'contain', // Ensures the whole photo is visible without cropping
};

const infoSection = { padding: '25px', backgroundColor: '#fff' };
const userDetails = { marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' };
const userText = { fontSize: '18px', margin: '0 0 5px 0', color: '#333' };
const dateText = { fontSize: '14px', margin: 0, color: '#888' };

const btnGroup = { display: 'flex', gap: '15px' };
const approveBtn = { flex: 2, padding: '15px', background: '#2d6a4f', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' };
const declineBtn = { flex: 1, padding: '15px', background: '#bc4749', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };

const emptyState = { textAlign: 'center', marginTop: '100px', color: '#555' };
const refreshBtn = { marginTop: '20px', padding: '10px 20px', borderRadius: '8px', border: '1px solid #2d6a4f', background: 'transparent', color: '#2d6a4f', cursor: 'pointer' };

export default AdminDashboard;