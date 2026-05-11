import express from 'express';
import User from '../models/user.js';
import { protect } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// --- HELPER FUNCTIONS ---
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already registered" });
        }
        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            token,
        });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill the fields" });
        }
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            token,
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- GET ME ---
router.get("/me", protect, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({ message: "Could not fetch user profile" });
    }
});

// --- 1. ADMIN: GET ALL PRIZES (Synchronized for AdminRedeem.jsx) ---
router.get('/all-prizes', protect, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Find users with items in inventory
        const users = await User.find({ "inventory.0": { $exists: true } })
                               .select('username email inventory');
        
        res.json(users);
    } catch (err) {
        console.error("Fetch Prizes Error:", err);
        res.status(500).json({ message: "Error fetching prizes" });
    }
});

// --- 2. ADMIN: MARK AS REDEEMED ---
router.post('/redeem-prize', protect, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Admin only" });
        }

        const { userId, prizeId } = req.body;
        const user = await User.findById(userId);
        
        if (!user) return res.status(404).json({ message: "User not found" });

        const prize = user.inventory.id(prizeId);
        if (prize) {
            prize.isUsed = true;
            await user.save();
            res.json({ message: "Prize marked as redeemed" });
        } else {
            res.status(404).json({ message: "Prize not found" });
        }
    } catch (err) {
        console.error("Redeem Error:", err);
        res.status(500).json({ message: "Redemption error" });
    }
});

export default router;