import { authenticate } from '$lib/server/authenticate';
import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

let client = await MongoClient.connect(MONGO_STRING);
let db = client.db("accounts");
let collection = db.collection("users");

export const GET = async ({cookies}) => {
    const data = authenticate(cookies);
    if(!data) return new Response(JSON.stringify({error: "Not authenticated."}), { status: 401 });
    try {
        const user = await collection.findOne({_id: new ObjectId(data.id)});
        user._id = user._id.toString();
        delete user.password;
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({error: "Account does not exist."}), { status: 404 });
    }
}