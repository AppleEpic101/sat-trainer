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

        log: {
            readingFocus: "All Reading Topics", 
            mathFocus: "All Math Topics",

            "All Reading Topics": {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },

            'Information and Ideas': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Craft and Structure': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Expression of Ideas': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Standard English Conventions': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },

            'Central Ideas and Details': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Inferences': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Command of Evidence': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Words in Context': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Text Structure and Purpose': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Cross-Text Connections': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Rhetorical Synthesis': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Transitions': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Boundaries': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Form, Structure, and Sense': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },

            "All Math Topics": {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },

            'Algebra': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Advanced Math': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Problem-Solving and Data Analysis': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Geometry and Trigonometry': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },

            'Linear equations in one variable': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Linear functions': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Linear equations in two variables': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Systems of two linear equations in two variables': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Linear inequalities in one or two variables': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Nonlinear functions': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Nonlinear equations in one variable and systems of equations in two variables': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Equivalent expressions': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Ratios, rates, proportional relationships, and units': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Percentages': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'One-variable data: Distributions and measures of center and spread': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Two-variable data: Models and scatterplots': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Probability and conditional probability': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Inference from sample statistics and margin of error': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Evaluating statistical claims: Observational studies and experiments': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Area and volume': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Lines, angles, and triangles': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Right triangles and trigonometry': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
            'Circles': {
                current: undefined,
                past: [],
                stats: {
                    rating: 0,
                    experience: 0,
                    streak: 0,
                    probabilityCorrect: 0,
                    correct: 0,
                    incorrect: 0,
                    skipped: 0,
                }
            },
        },

        isAdmin: false,
        isReviewer: false,
        editLog: [],
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