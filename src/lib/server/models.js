// import mongoose from "mongoose";

// const user = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     stats: {
//         rating: Number,
//         experience: Number,
//         correct: Number,
//         incorrect: Number,
//         skipped: Number,

//     },
//     reading: {
//         rating: Number,
//         experience: Number,
//         correct: Number,
//         incorrect: Number,
//         skipped: Number,

//         'Information and Ideas': Object,
//         'Craft and Structure': Object,
//         'Expression of Ideas': Object,
//         'Standard English Conventions': Object,
//     },
//     math: {
//         rating: Number,
//         experience: Number,
//         correct: Number,
//         incorrect: Number,
//         skipped: Number,

//         'Algebra': Object,
//         'Advanced Math': Object,
//         'Problem-Solving and Data Analysis': Object,
//         'Geometry and Trigonometry': Object,
//     },
    
//     isAdmin: {
//         type: Boolean,
//         default: false,
//     },
    
//     settings: {
//         darkMode: Boolean,
//         hideProfile: Boolean,
//     }
// });

// export const UserModel = mongoose.model("User", user); 