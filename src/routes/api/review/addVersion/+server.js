import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { send } from "process";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async ({request}) => {
    const req = await request.json();
    const { _id, version } = req;
    
    console.log("REUQEST" , req)
    review.updateOne({_id: new ObjectId(_id)}, {$push: {versions: version, messageLog: version}})

    return new Response("Version added", {status: 200});
}
