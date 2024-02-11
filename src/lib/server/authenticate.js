import jwt from 'jsonwebtoken';
import { MongoClient } from "mongodb";
import { MONGO_STRING, JWT_KEY } from "$env/static/private";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

export const authenticate = (cookies) => {
    try {
        let token = cookies.get('auth');
        const auth = jwt.verify(token, JWT_KEY);
        // const user = await collection.findById(auth.id);
      
        return auth;
    } catch {
        return undefined;
    }
}