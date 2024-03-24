import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { getLevel, updateRating } from "$lib/question/rating";

const client = await MongoClient.connect(MONGO_STRING);
const accounts = client.db("accounts");
const users = accounts.collection("users");

const questions = client.db("questions");
const rw = questions.collection("rw");
const math = questions.collection("math");

export const POST = async ({request}) => {
    const res = await request.json();
    let { question, user, selectedAnswer } = res;

    let correctAnswer = selectedAnswer == question.question.correctAnswer || question.question.correctAnswer.includes(selectedAnswer);
    
    if(question.section === "Reading") {
        let newRating = updateRating(user.stats.rating, question.difficulty, correctAnswer);

        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "stats.rating": newRating,
        }});
        if(correctAnswer) {
            await rw.updateOne({ _id: new ObjectId(question._id) }, { $set: {
                "stats.correct": question.stats.correct + 1
            }});
            await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
                "stats.correct": user.stats.correct + 1,
            }});
        } else {
            await rw.updateOne({ _id: new ObjectId(question._id) }, { $set: {
                "stats.incorrect": question.stats.incorrect + 1
            }});
            await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
                "stats.incorrect": user.stats.incorrect + 1,
            }});
        }


    }


    // console.log("THINGY", res);

    return new Response(JSON.stringify(res), { status: 201 });
}