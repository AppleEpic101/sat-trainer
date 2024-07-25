import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async ( {request} ) => {
    const res = await request.json();

    let { _id } = res;

    let data = await review.findOne({ _id: new ObjectId(_id) });
    data._id = data._id.toString();

    return new Response(JSON.stringify(data), { status: 200 });
}