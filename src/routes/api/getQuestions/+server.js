import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");

const rw = questions.collection("rw");
const math = questions.collection("math");

export const POST = async ({request}) => {
    const res = await request.json();
    const { limit, section, query } = res;

    let match = {};
    for (let key in query) {
        if (Array.isArray(query[key]) && query[key].length !== 0) {
            query[key] = query[key].flat();
            match[key] = { $in: query[key] };
        } else if (query[key].length !== 0) {
            match[key] = query[key];
        }
    }

    let collection = section === "Reading" ? rw : math;

    let data = await collection.find({ $match: match }).toArray();
    return new Response(JSON.stringify(data), { status: 201 });
}