import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");

export const POST = async ({request}) => {
    const res = await request.json();
    const { id } = res;

    let data = await questions.collection("rw").findOne({"id.SAT": id });
    if(!data) data = await questions.collection("math").findOne({"id.SAT": id });

    return new Response(JSON.stringify(data), { status: 201 });
}