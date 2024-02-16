import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    stats: {
        experience: Number,
        correct: Number,
        incorrect: Number,

        reading: {
            experience: Number,
            correct: Number,
            incorrect: Number,
        },
        math: {
            experience: Number,
            correct: Number,
            incorrect: Number,
        },
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