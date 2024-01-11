import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private"
import { error } from "@sveltejs/kit";


const mongo = MONGO_STRING;

export const GET = async ({url}) => {
    let client;

    let program = url.searchParams.get("program");
    let queryParams = JSON.parse(url.searchParams.get("q")) || {};

    try {
        client = await MongoClient.connect(mongo);

        let db = client.db("questions");
        let collection = db.collection(program);

        // get a random document from collection
        const document = await collection.aggregate([ 
            { $match: queryParams },
            { $sample: { size: 1 } }
        ]).toArray();

        return new Response(JSON.stringify(document[0], null, 2), { status: 200 });
    } catch(e) {
        console.log(e);
        return error(500, "Internal Server Error");
    } finally {
        client?.close();
    }
}