import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async () => {
    const reviews = await review.find().toArray();

    return new Response(JSON.stringify(reviews), { status: 200 });
}