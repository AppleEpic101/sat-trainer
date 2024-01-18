import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";


const mongo = MONGO_STRING;

export const POST = async ({request}) => {

    const { email, password } = await request.json();

    let client = await MongoClient.connect(mongo);
    let db = client.db("accounts");
    let collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (user) {
         return new Response(JSON.stringify({error: "User already exists"}), {status: 409});
    }

    await collection.insertOne({ email, password }); 

    return new Response(JSON.stringify({message: "Success"}), {status: 201});
    
}
