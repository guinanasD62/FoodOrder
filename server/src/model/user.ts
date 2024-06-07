import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        unique: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        min: 6,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurant'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
