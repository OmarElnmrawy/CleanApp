import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; 
import { fileURLToPath } from 'url';
import Upload from '../models/Upload.js';
import { protect } from '../middleware/auth.js';
import User from '../models/user.js';
import crypto from 'crypto';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage });

// 1. UPLOAD ROUTE
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath); 
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');

    const existing = await Upload.findOne({ fileHash: hash });
    if (existing) {
      fs.unlinkSync(filePath); 
      return res.status(400).json({ message: "Cheat detected!" });
    }

    const newUpload = await Upload.create({
      user: req.user._id,
      imageUrl: req.file.filename,
      fileHash: hash,
      status: 'pending'
    });

    res.status(201).json(newUpload);
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: error.message });
  }
});

// 2. UPDATE STATUS (The "Points Fix" Version)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!req.user.isAdmin) return res.status(403).json({ message: "Admins only" });

    // Fetch the upload to see who it belongs to and its CURRENT status
    const uploadEntry = await Upload.findById(req.params.id);
    if (!uploadEntry) return res.status(404).json({ message: "Upload not found" });

    // ONLY add points if we are moving from 'pending' to 'approved'
    if (status === 'approved' && uploadEntry.status !== 'approved') {
      const hour = new Date().getHours();
      // Peak hour bonus (12 PM - 2 PM)
      const pointsToAdd = (hour >= 12 && hour <= 14) ? 10 : 5;

      // FORCE update in database using $inc (Increment)
      const updatedUser = await User.findByIdAndUpdate(
        uploadEntry.user,
        { $inc: { points: pointsToAdd } },
        { new: true }
      );

      console.log(`⭐ Points awarded! ${updatedUser.username} now has ${updatedUser.points}`);
    }

    // Now update the status of the upload itself
    uploadEntry.status = status;
    await uploadEntry.save();

    res.json({ message: `Success. Points checked and status set to ${status}` });
  } catch (error) {
    console.error("Points Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// 3. OTHER ROUTES
router.get('/pending', protect, async (req, res) => {
  const pending = await Upload.find({ status: 'pending' }).populate('user', 'username');
  res.json(pending);
});

router.get('/my-history', protect, async (req, res) => {
  const history = await Upload.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(history);
});

export default router;