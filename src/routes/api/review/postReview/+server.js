import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async ({request}) => {
    const res = await request.json();

    try { 
        await review.insertOne(res);
        return new Response(JSON.stringify({message: "Review posted"}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({message: "Review failed"}), { status: 500 });
    }
}

export const DELETE = async ({request}) => {

    const res = await request.json();
    let { _id } = res;

    try {
        await review.deleteOne({ _id: new ObjectId(_id) });
        return new Response(JSON.stringify({message: "Review deleted"}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({message: "Review failed"}), { status: 500 });
    }
}