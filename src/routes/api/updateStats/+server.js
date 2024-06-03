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
    let isCorrect = selectedAnswer == question.question.correctAnswer || question.question.correctAnswer.includes(selectedAnswer);

    let collection = question.section === "Reading" ? rw : math;
    let userCollection = question.section === "Reading" ? "reading" : "math";

    let newRating = updateRating(user.stats.rating, question.difficulty, isCorrect);

    await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
        "stats.rating": newRating,
    }});

    let newSectionRating = updateRating(user[userCollection].rating, question.difficulty, isCorrect);
    await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
        [userCollection + ".rating"]: newSectionRating,
    }});
    if(isCorrect) {
        await collection.updateOne({ _id: new ObjectId(question._id) }, { $set: {
            "stats.correct": question.stats.correct + 1
        }});
        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "stats.correct": user.stats.correct + 1,
            [userCollection + ".correct"]: user[userCollection].correct + 1
        }});
    } else {
        await collection.updateOne({ _id: new ObjectId(question._id) }, { $set: {
            "stats.incorrect": question.stats.incorrect + 1
        }});
        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "stats.incorrect": user.stats.incorrect + 1,
            [userCollection + ".incorrect"]: user[userCollection].incorrect + 1
        }});
    }


    
    return new Response(JSON.stringify(res), { status: 201 });
}