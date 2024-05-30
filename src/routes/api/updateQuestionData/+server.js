import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);

const questions = client.db("questions");
const rw = questions.collection("rw");
const math = questions.collection("math");

export const POST = async ({request}) => {
    const res = await request.json();
    let { question, id } = res;

    let collection = question.section === "Reading" ? rw : math;
    await collection.updateOne({"id.SAT": id}, { $set: question});

    return new Response(JSON.stringify(res), { status: 201 });
}