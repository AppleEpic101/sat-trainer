import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { getLevel, updateRating, gainXP } from "$lib/question/rating";

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



    if(isCorrect) {
        await collection.updateOne({ _id: new ObjectId(question._id) }, { $set: {
            "stats.correct": question.stats.correct + 1,
        }});
        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "stats.correct": user.stats.correct + 1,
            "stats.experience": user.stats.experience + gainXP(user.stats.correct / (user.stats.correct + user.stats.incorrect), question.difficulty, isCorrect, 1),

            [userCollection + ".correct"]: user[userCollection].correct + 1,
            [userCollection + ".experience"]: user[userCollection].experience + gainXP(user[userCollection].correct / (user[userCollection].correct + user[userCollection].incorrect), question.difficulty, isCorrect, 1),

            [userCollection + "."  + question.domain + ".correct"]: user[userCollection][question.domain].correct + 1,
            [userCollection + "." + question.domain + ".experience"]: user[userCollection][question.domain].experience + gainXP(user[userCollection][question.domain].correct / (user[userCollection][question.domain].correct + user[userCollection][question.domain].incorrect), question.difficulty, isCorrect, 1),

            [userCollection + "." + question.domain + "." + question.skill + ".correct"]: user[userCollection][question.domain][question.skill].correct + 1,
            [userCollection + "." + question.domain + "." + question.skill + ".experience"]: user[userCollection][question.domain][question.skill].experience + gainXP(user[userCollection][question.domain][question.skill].correct / (user[userCollection][question.domain][question.skill].correct + user[userCollection][question.domain][question.skill].incorrect), question.difficulty, isCorrect, 1),
        }});
    } else {
        await collection.updateOne({ _id: new ObjectId(question._id) }, { $set: {
            "stats.incorrect": question.stats.incorrect + 1,
        }});
        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "stats.incorrect": user.stats.incorrect + 1,
            [userCollection + ".incorrect"]: user[userCollection].incorrect + 1,
            [userCollection + "." + question.domain + ".incorrect"]: user[userCollection][question.domain].incorrect + 1,
            [userCollection + "." + question.domain + "." + question.skill + ".incorrect"]: user[userCollection][question.domain][question.skill].incorrect + 1,
        }});
    }
  
    return new Response(JSON.stringify({
        user: await users.findOne({ _id: new ObjectId(user._id) })
    }), { status: 201 });
}