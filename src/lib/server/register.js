import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { UserModel } from "$lib/server/models.js";
import bcrypt from "bcrypt";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

export const register = async (data) => {
    let { email, username, password, confirmPassword } = data;
    if(!email) return { error: "Missing email"};
    if(!username) return { error: "Missing username"};
    if(!password) return { error: "Missing password"};
    if(!confirmPassword) return { error: "Confirm your password"};
    if(password !== confirmPassword) return { error: "Passwords do not match."};

    const user = await collection.findOne({ email });
    
    if (user) {
        return { error: "User already exists."};
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ username, email, password: hashedPassword });

    try {
        await collection.insertOne(newUser);
        // await collection.insertOne({ email, password: hashedPassword }); 
        return { error: "" };
    } catch (error) {
        return { error: error?.toString() };
    }
}
