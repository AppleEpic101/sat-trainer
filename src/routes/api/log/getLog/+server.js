import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { getLevel, updateRating } from "$lib/question/rating";
import { generateSkillsArray } from "$lib/util.js";

const client = await MongoClient.connect(MONGO_STRING);
const accounts = client.db("accounts");
const users = accounts.collection("users");

const questions = client.db("questions");
const rw = questions.collection("rw");
const math = questions.collection("math");

export const POST = async ({request, fetch}) => {
    const res = await request.json();
    const { user, section } = res;

    let collection = section === "Reading" ? rw : math;
    let focus = user.log.focus;

    let skillsArray = generateSkillsArray(focus, "Reading");
    if (focus === "All") {
        focus = section.toLowerCase();
    }
    
    let question;
    if (user.log[focus].current) {
        question = await collection.findOne({_id: new ObjectId(user.log[focus].current)});
    } else {
        let questionRes = await fetch('/api/getQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ section, focus: skillsArray })
        });
        question = await questionRes.json();
    
        await fetch("/api/log/saveLog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user, section, focus, questionID: question._id })
        });
    }
    return new Response(JSON.stringify({question}), { status: 201 });
}