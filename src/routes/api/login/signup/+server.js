import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private"
import { error } from "@sveltejs/kit";


const mongo = MONGO_STRING;

let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

const POST = async () => {
    
}
