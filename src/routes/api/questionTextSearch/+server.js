import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");

const rw = questions.collection("rw");
const math = questions.collection("math");

await rw.createIndex({"question.stimulus": "text"});
await math.createIndex({"question.stimulus": "text"});

export const POST = async ({request}) => {
    const res = await request.json();
    const { section, query, limit, skip, tags } = res;

    let collection = section === "Reading" ? rw : math;

    let match = {};
    for (let key in tags) {
        if (Array.isArray(tags[key]) && tags[key].length !== 0) {
            tags[key] = tags[key].flat();
            match[key] = { $in: tags[key] };
        } else if (tags[key].length !== 0) {
            match[key] = tags[key];
        }
    }

    let data;
    if (query.trim() === "") {
        data = await collection.find(match).toArray();
    } else {
        data = await collection.find({ $text: { $search: query }, $match: match}).toArray();
    }

    return new Response(JSON.stringify(data), { status: 201 });
}