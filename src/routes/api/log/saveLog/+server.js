import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const accounts = client.db("accounts");
const users = accounts.collection("users");

export const POST = async ({request, fetch}) => {
    const res = await request.json();
    const { user, section, focus, questionID } = res;

    
    await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
        ["log." + focus + ".current"]: questionID,
    }});

    return new Response(JSON.stringify(res), { status: 201 });
}