import React, { useState, useEffect } from 'react';

const AdminRedeem = () => {
    const [userPrizes, setUserPrizes] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch all prizes from the backend
    const fetchPrizes = () => {
        fetch('http://localhost:5000/api/users/all-prizes', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => {
            setUserPrizes(data);
            setLoading(false);
        })
        .catch(err => console.error("Error:", err));
    };

    useEffect(() => {
        fetchPrizes();
    }, []);

    // 2. Handle the physical redemption
    const handleRedeem = async (userId, prizeId) => {
        if (!window.confirm("Are you sure you want to mark this as Redeemed?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/users/redeem-prize`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({ userId, prizeId })
            });

            if (res.ok) {
                // Refresh the list to show the updated status
                fetchPrizes(); 
            } else {
                const errorData = await res.json();
                alert(errorData.message || "Redemption failed");
            }
        } catch (err) {
            alert("Server error during redemption");
        }
    };

    if (loading) return <div style={{ padding: '40px' }}>Loading Prizes...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#1b4332' }}>🎁 Prize Fulfillment Center</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Verify the student's ID and prize before clicking <b>Mark Redeemed</b>.
            </p>

            <table style={tableStyle}>
                <thead>
                    <tr style={{ background: '#1b4332', color: 'white' }}>
                        <th style={thStyle}>Student Info</th>
                        <th style={thStyle}>Prize Details</th>
                        <th style={thStyle}>Date Won</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userPrizes.length === 0 ? (
                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No prizes found in the system.</td></tr>
                    ) : (
                        userPrizes.map(user => user.inventory.map(prize => (
                            <tr key={prize._id} style={trStyle}>
                                <td style={tdStyle}>
                                    <div style={{ fontWeight: 'bold' }}>{user.username}</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
                                </td>
                                <td style={tdStyle}>
                                    <span style={prizeBadge}>{prize.item}</span>
                                </td>
                                <td style={tdStyle}>
                                    {new Date(prize.dateWon || prize.wonAt).toLocaleDateString()}
                                </td>
                                <td style={tdStyle}>
                                    {prize.isUsed ? (
                                        <span style={{ color: '#bc4749', fontWeight: 'bold' }}>✅ Already Redeemed</span>
                                    ) : (
                                        <button 
                                            onClick={() => handleRedeem(user._id, prize._id)}
                                            style={redeemBtn}
                                        >
                                            Mark as Redeemed
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )))
                    )}
                </tbody>
            </table>
        </div>
    );
};

// --- STYLES ---
const tableStyle = { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const thStyle = { padding: '15px', textAlign: 'left' };
const tdStyle = { padding: '15px', borderBottom: '1px solid #eee' };
const trStyle = { transition: 'background 0.2s' };
const prizeBadge = { backgroundColor: '#e8f5e9', color: '#2d6a4f', padding: '5px 10px', borderRadius: '15px', fontWeight: 'bold', fontSize: '14px' };
const redeemBtn = { 
    backgroundColor: '#2d6a4f', 
    color: 'white', 
    border: 'none', 
    padding: '8px 16px', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    transition: '0.3s' 
};

export default AdminRedeem;