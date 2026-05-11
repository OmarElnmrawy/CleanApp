import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/spin', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.points < 30) {
      return res.status(400).json({ message: "You need 30 points to spin!" });
    }

    // 1. Deduct points
    user.points -= 30;

    // 2. Weighted Prize Logic
    const rand = Math.random() * 100; // Generate number between 0 and 100
    let wonPrize = null;

    if (rand < 5) {
      // 5% chance
      wonPrize = { name: "🎟️ Voucher 40 LE", days: 7 }; 
    } else if (rand < 25) {
      // 20% chance (5 to 25)
      wonPrize = { name: "🍫 Chocolate Bar", days: 3 };
    } else if (rand < 45) {
      // 20% chance (25 to 45)
      wonPrize = { name: "☕ Coffee Discount", days: 3 };
    } else {
      // 55% chance (45 to 100)
      wonPrize = { name: "🍭 Sweet Treats", days: 2 };
    }

    // 3. Add to inventory
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + wonPrize.days);

    user.inventory.push({
      item: wonPrize.name,
      expiryDate: expiry,
      isUsed: false,
      wonAt: new Date() // Useful for the Admin Redeem panel we'll make
    });

    await user.save();
    res.json({ prize: wonPrize.name, remainingPoints: user.points });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during spin" });
  }
});

router.post('/use-item/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const item = user.inventory.id(req.params.id);
    
    if (item) {
      item.isUsed = true;
      await user.save();
      res.json({ message: "Item redeemed!" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Redemption error" });
  }
});

export default router;