import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private"
import { error } from "@sveltejs/kit";


const mongo = MONGO_STRING;

export const GET = async ({url}) => {
    let client;

    let program = url.searchParams.get("program");
    let queryParams = JSON.parse(url.searchParams.get("q")) || {};

    let match = {};
    for (let key in queryParams) {
        if (Array.isArray(queryParams[key]) && queryParams[key].length !== 0) {
            queryParams[key] = queryParams[key].flat();
            match[key] = { $in: queryParams[key] };
        } else if (queryParams[key].length !== 0) {
            match[key] = queryParams[key];
        }
    }

    try {
        client = await MongoClient.connect(mongo);

        let db = client.db("questions");
        let collection = db.collection(program);

        const count = await collection.countDocuments(match);
        console.log("ye", count);
        // get a random document from collection
        const document = await collection.aggregate([ 
            { $match: match },
            { $sample: { size: 1 } }
        ]).toArray();

        return new Response(JSON.stringify({ document: document[0], count: count }, null, 2), { status: 200 });
    } catch(e) {
        console.log(e);
        return error(500, "Internal Server Error");
    } finally {
        client?.close();
    }
}