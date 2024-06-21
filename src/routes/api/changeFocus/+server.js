import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const accounts = client.db("accounts");
const users = accounts.collection("users");

export const POST = async ({request}) => {
    const res = await request.json();

    let { user, newFocus, section } = res;

    if (section === "Reading") {
        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "log.readingFocus": newFocus
        }});
    } else {
        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "log.mathFocus": newFocus
        }});
    
    }

    return new Response(JSON.stringify(res), { status: 201 });
}