import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const review = questions.collection("review-board");

export const POST = async ({request}) => {
    const res = await request.json();

    let { oldData, newData, user } = res;

    try { 
        await review.insertOne({
            user: user,
            oldData: oldData,
            newData: newData

        });

        return {
            status: 200, 
            body: {
                message: "Successfully posted to review board"
            }
        }
    } catch (error) {
        return {
            status: 500,
            body: {
                message: "Error posting to review board"
            }
        }
    }


}