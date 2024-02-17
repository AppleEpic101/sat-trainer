import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

export const GET = async ({url}) => {
    let program = url.searchParams.get("program");
    let queryParams = JSON.parse(url.searchParams.get("query"));

    for(let key in queryParams) {
        if(queryParams[key]?.length === 0 ) {
            delete queryParams[key];
        } else {
            queryParams[key] = queryParams[key].flat();
            queryParams[key] = { $in: queryParams[key] };
        }
    }

    try {
        let client = await MongoClient.connect(MONGO_STRING);
        let db = client.db("questions");
        let collection = db.collection(program);

        const count = await collection.countDocuments(queryParams);

        return new Response(JSON.stringify({count}), {status: 200});
    } catch(e) {
        console.log(e);
    }
}