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

            [`log.All ${question.section} Topics.stats.correct`]: user.log[`All ${question.section} Topics`].stats.correct + 1,
            [`log.All ${question.section} Topics.stats.experience`]: user.log[`All ${question.section} Topics`].stats.experience + gainXP(user.log[`All ${question.section} Topics`].stats.correct / (user.log[`All ${question.section} Topics`].stats.correct + user.log[`All ${question.section} Topics`].stats.incorrect), question.difficulty, isCorrect, 1),

            
            [`log.${question.domain}.stats.correct`]: user.log[question.domain].stats.correct + 1,
            [`log.${question.domain}.stats.experience`]: user.log[question.domain].stats.experience + gainXP(user.log[question.domain].stats.correct / (user.log[question.domain].stats.correct + user.log[question.domain].stats.incorrect), question.difficulty, isCorrect, 1),

            [`log.${question.skill}.stats.correct`]: user.log[question.skill].stats.correct + 1,
            [`log.${question.skill}.stats.experience`]: user.log[question.skill].stats.experience + gainXP(user.log[question.skill].stats.correct / (user.log[question.skill].stats.correct + user.log[question.skill].stats.incorrect), question.difficulty, isCorrect, 1),
        }});
    } else {
        await collection.updateOne({ _id: new ObjectId(question._id) }, { $set: {
            "stats.incorrect": question.stats.incorrect + 1,
        }});
        await users.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "stats.incorrect": user.stats.incorrect + 1,

            [`log.All ${question.section} Topics.stats.incorrect`]: user.log[`All ${question.section} Topics`].stats.incorrect + 1,
            [`log.${question.domain}.stats.incorrect`]: user.log[question.domain].stats.incorrect + 1,
            [`log.${question.skill}.stats.incorrect`]: user.log[question.skill].stats.incorrect + 1,
        }});
    }
  
    return new Response(JSON.stringify({
        user: await users.findOne({ _id: new ObjectId(user._id) })
    }), { status: 201 });
}