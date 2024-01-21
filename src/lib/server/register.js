import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import bcrypt from "bcrypt";

const mongo = MONGO_STRING;

export const register = async (email, password) => {

    let client = await MongoClient.connect(mongo);
    let db = client.db("accounts");
    let collection = db.collection("users");

    if(!email || !password) return { error: "Missing email or password."};

    const user = await collection.findOne({ email });
    
    if (user) {
        return { error: "User already exists."};
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await collection.insertOne({ email, password: hashedPassword }); 
        return { error: "" };
    } catch (error) {
        return { error: error?.toString() };
    }
}
