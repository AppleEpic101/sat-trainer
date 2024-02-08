import mongoose from "mongoose";

const user = new mongoose.Schema({
    email: {String, required: true, unique: true, trim: true},
    password: {String, required: true},
    name: {String, required: true}
});

export const User = mongoose.model("User", user);