import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");

const rw = questions.collection("rw");
const math = questions.collection("math");

export const POST = async ({request}) => {
    const res = await request.json();
    const { section, query } = res;

    let collection = section === "Reading" ? rw : math;

    let data = await collection.find({ $text: { $search: query }}).toArray();
    return new Response(JSON.stringify(data), { status: 201 });
}