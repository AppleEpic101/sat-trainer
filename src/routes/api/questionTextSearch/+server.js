import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

export const POST = async ({request}) => {
    const client = await MongoClient.connect(MONGO_STRING);
    const questions = client.db("questions");

    const rw = questions.collection("rw");
    const math = questions.collection("math");

    await rw.createIndex({"question.stimulus": "text"});
    await math.createIndex({"question.stimulus": "text"});

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

    match.source = "College Board";

    let data;
    if (query.trim() === "") {
        data = await collection.find(match).toArray();
    } else {
        // data = await collection.find({ $text: { $search: query }, ...match}).toArray();
        data = await collection.find(
            { $text: { $search: query }, ...match },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }).toArray();
    }

    client.close();

    return new Response(JSON.stringify(data), { status: 201 });
}