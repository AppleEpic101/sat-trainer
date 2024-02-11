import { authenticate } from '$lib/server/authenticate';
import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING, JWT_KEY } from "$env/static/private";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

export const load = async (event) => {
    const data = authenticate(event.cookies);
    if(!data) return undefined;
    const {email, username} = await collection.findOne({_id: new ObjectId(data.id)});
    return { email, username };
}