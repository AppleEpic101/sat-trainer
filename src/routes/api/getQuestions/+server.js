import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");

const rw = questions.collection("rw");
const math = questions.collection("math");

export const POST = async ({request}) => {
    const res = await request.json();
    const { limit, section } = res;

    let data = await rw.find({}).limit(limit).toArray();
    return new Response(JSON.stringify(data), { status: 201 });
}