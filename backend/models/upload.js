import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },
  pointsAwarded: {
    type: Number,
    default: 0
  },
  
  fileHash: { type: String, required: true, unique: true }, // Unique prevents duplicates

  
}, { timestamps: true });

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;