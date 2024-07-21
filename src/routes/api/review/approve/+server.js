import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const questions = client.db("questions");
const accounts = client.db("accounts");

const users = accounts.collection("users");
const review = questions.collection("review-board");
const rw = questions.collection("rw");
const math = questions.collection("math");


export const POST = async ({request}) => {
    const req = await request.json();
    const { data, versionIndex} = req;

    let version = data.versions[versionIndex];
    let qData = version.newData;

    let collection = qData.section === "Reading" ? rw : math;
    let insertResult = await collection.insertOne(qData);
    
    let date = new Date();

    await collection.updateOne({ _id: insertResult.insertedId }, { $set: { "id.SAT": insertResult.insertedId.toString() } });
    await review.updateOne({ _id: new ObjectId(data._id) }, { $set: { "meta.state": "closed" } });
    await review.updateOne({ _id: new ObjectId(data._id) }, { $push: { 
        messageLog: { 
            meta: {
                type: "approve",
                date,
                user: data.user,
            }
        } 
        } 
    });
    await users.updateOne({ _id: new ObjectId(data.meta.user._id) }, { $push: { 
        editLog: {
            type: data.meta.type,
            date: data.meta.date, // date of review creation
            user: data.meta.user,
            comments: data.meta.comments
        }
    }});
    await collection.updateOne({_id: insertResult.insertedId}, { $push: { editLog: 
        {
            type: data.meta.type,
            date: data.meta.date, // date of review creation
            user: data.meta.user,
            comments: data.meta.comments
        }
    } });

    return new Response(JSON.stringify({questionID: insertResult.insertedId.toString()}), {status: 200});
}
