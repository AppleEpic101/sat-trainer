import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    stats: {
        rating: Number,
        experience: Number,
        correct: Number,
        incorrect: Number,
        skipped: Number,
    },
    reading: {
        rating: Number,
        experience: Number,
        correct: Number,
        incorrect: Number,
        skipped: Number,
    },
    math: {
        rating: Number,
        experience: Number,
        correct: Number,
        incorrect: Number,
        skipped: Number,
    },
    
    isAdmin: {
        type: Boolean,
        default: false,
    },
    
    settings: {
        darkMode: Boolean,
        hideProfile: Boolean,
    }
});

export const UserModel = mongoose.model("User", user); 