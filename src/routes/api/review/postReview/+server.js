import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async ({request}) => {
    const res = await request.json();

    let { oldData, newData, user, comments } = res;

    let date = new Date();

    if(comments === '') {
        comments = "None";
    }

    const meta = {
        decision: "pending", 
        type: "review", 
        comments: comments,
        date: date,
        questionID: oldData.id.SAT,
    }

    try { 
        await review.insertOne({
            user: user,
            oldData: oldData,
            newData: newData,
            meta: meta,

        });

        return new Response(JSON.stringify({message: "Review posted"}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({message: "Review failed"}), { status: 500 });
    }


}