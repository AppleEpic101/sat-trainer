import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async ({request}) => {
    const req = await request.json();
    const { _id, version } = req;
    
    review.updateOne({_id: new ObjectId(_id)}, {$push: {versions: version, messageLog: version}})

    return new Response(JSON.stringify({}), {status: 200});
}
