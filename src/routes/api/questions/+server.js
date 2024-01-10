import { MongoClient } from "mongodb";
import { error } from "@sveltejs/kit";


const url = '';

export const GET = async () => {
    let client;
    try {
        client = await MongoClient.connect(url);
        console.log("Connected to server");

        let db = client.db("DSAT");
        let collection = db.collection("reading");
        const documents = await collection.find({ "difficulty": "H"}).toArray();

        return new Response(JSON.stringify(documents, null, 2), { status: 200 });
    } catch(e) {
        console.log(e);
        return error(500, "Internal Server Error");
    } finally {
        client?.close();
    }
}