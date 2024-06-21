import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { UserModel } from "$lib/server/models.js";
import bcrypt from "bcrypt";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

const validate = (data) => {
    let { email, username, password, confirmPassword } = data;
    if(!email) return { error: "Missing email"};
    if(!username) return { error: "Missing username"};
    if(!password) return { error: "Missing password"};
    if(!confirmPassword) return { error: "Confirm your password"};
    if(password !== confirmPassword) return { error: "Passwords do not match."};

    return {};
}

const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

}

export const register = async (data) => {
    let { error } = validate(data);
    if(error) return { error };

    let { email, username, password } = data;

    const user = await collection.findOne({ email });
    
    if (user) {
        return { error: "User already exists."};
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { 
        username, 
        email, 
        password: hashedPassword,
        stats: {
            rating: 0,
            experience: 0,
            correct: 0,
            incorrect: 0,
            skipped: 0,
        },
        reading: {
            rating: 0,
            experience: 0,
            correct: 0,
            incorrect: 0,
            skipped: 0,

            "Information and Ideas": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,

                "Central Ideas and Details": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Inferences": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Command of Evidence": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
            },
            "Craft and Structure": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,

                "Words in Context": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Text Structure and Purpose": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Cross-Text Connections": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
            },
            "Expression of Ideas": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,

                "Rhetorical Synthesis": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Transitions": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
            },
            "Standard English Conventions": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,

                "Boundaries": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Form, Structure, and Sense": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
            },
        },
        math: {
            rating: 0,
            experience: 0,
            correct: 0,
            incorrect: 0,
            skipped: 0,

            "Algebra": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,
                
                "Linear equations in one variable": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                'Linear functions': {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },  

                'Linear equations in two variables': {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },  
                'System of two linear equations in two variables': {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },  
                'Linear inequalities in one or two variables': {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },  
            },
            "Advanced Math": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,

                "Nonlinear functions": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Nonlinear equations in one variable": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Equivalent expressions": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
            },
            "Problem-Solving and Data Analysis": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,
                
                "Ratios, rates, proportional relationships, and units": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Percentages": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "One-variable data: Distributions and measures of center and spread": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Two-variable data: Models and scatterplots": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Probability and conditional probability": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Inference from sample statistics and margin of error": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Evaluating statistical claims: Observational studies and experiments": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
            },
            "Geometry and Trigonometry": {
                rating: 0,
                experience: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,
                
                "Area and volume": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Lines, angles, and triangles": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Right triangles and trigonometry": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
                "Circles": {
                    rating: 0,
                    experience: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                },
            },
        },

        log: {
            focus: 'All',

            "reading": {
                current: undefined,
                isAnswered: false,
                past: [],
            },

            'Information and Ideas': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Craft and Structure': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Expression of Ideas': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Standard English Conventions': {
                current: undefined,
                isAnswered: false,
                past: [],
            },

            'Central Ideas and Details': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Inferences': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Command of Evidence': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Words in Context': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Text Structure and Purpose': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Cross-Text Connections': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Rhetorical Synthesis': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Transitions': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Boundaries': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Form, Structure, and Sense': {
                current: undefined,
                isAnswered: false,
                past: [],
            },

            "math": {
                current: undefined,
                isAnswered: false,
                past: [],
            },

            'Algebra': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Advanced Math': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Problem-Solving and Data Analysis': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Geometry and Trigonometry': {
                current: undefined,
                isAnswered: false,
                past: [],
            },

            'Linear equations in one variable': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Linear functions': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Linear equations in two variables': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'System of two linear equations in two variables': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Linear inequalities in one or two variables': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Nonlinear functions': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Nonlinear equations in one variable': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Equivalent expressions': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Ratios, rates, proportional relationships, and units': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Percentages': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'One-variable data: Distributions and measures of center and spread': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Two-variable data: Models and scatterplots': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Probability and conditional probability': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Inference from sample statistics and margin of error': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Evaluating statistical claims: Observational studies and experiments': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Area and volume': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Lines, angles, and triangles': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Right triangles and trigonometry': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
            'Circles': {
                current: undefined,
                isAnswered: false,
                past: [],
            },
        },

        isAdmin: false,
        settings: {
            darkMode: false,
            hideProfile: false,
        }
    };

    try {
        await collection.insertOne(newUser);
        return { error: "" };
    } catch (error) {
        return { error: error?.toString() };
    }
}


export const updateInfo = async (data) => {

    let { _id, email, username, password, confirmPassword } = data;

    if(!email) return { error: "Missing email"};
    if(!username) return { error: "Missing username"};
    if(password !== confirmPassword) return { error: "Passwords do not match."};

    data.password = await hash(password);

    if(password === "") {
        delete data.password;
    }
    delete data.confirmPassword;
    delete data._id;
    

    await collection.updateOne({_id: new ObjectId(_id)}, { $set: data});
    return { message: "Update successful!", update: data}
}