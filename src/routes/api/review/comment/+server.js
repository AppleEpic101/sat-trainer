import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async ({request}) => {
    const res = await request.json();

    const { comment } = res;
    const user = res.review.user;
    const rev = res.review; 

    if (comment === '') {
        return new Response(JSON.stringify({message: "Comment cannot be empty"}), { status: 400 });
    }
    
    let date = new Date();

    try {
        await review.updateOne({ _id: new ObjectId(rev._id) }, { $push: { messageLog: {
            comment,
            meta: {
                type: 'Comment',
                user,
                date,
            }
        }} });
        return new Response(JSON.stringify({message: "Comment successful"}), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "Comment failed"}), { status: 500 });
    }
}