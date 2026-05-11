import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    points: {
        type: Number,
        default: 0
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    // --- UPDATED INVENTORY FOR THE WHEEL ---
    inventory: [{
        item: String,
        dateWon: { type: Date, default: Date.now },
        expiryDate: { type: Date }, // For rewards that expire
        isUsed: { type: Boolean, default: false } // To track if they redeemed it
    }],

    uploads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
    }]
}, { timestamps: true });

// --- PASSWORD HASHING LOGIC ---
userSchema.pre("save", async function() {
    if (!this.isModified("password")) {
        return; 
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error; 
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;