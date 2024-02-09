import { MongoClient } from "mongodb";
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { MONGO_STRING, JWT_KEY } from "$env/static/private";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");
let cookiesdb = db.collection("cookies");

export const login = async (email, password) => {
    const user = await collection.findOne({ email });

    if(!user) { 
        return {
            status: 401,
            body: {
                message: "Incorrect email or password."
            }
        }
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        return {
            status: 401,
            body: {
                message: "Unauthorized"
            }
        }
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_KEY);
    return { status: 200, token };
}