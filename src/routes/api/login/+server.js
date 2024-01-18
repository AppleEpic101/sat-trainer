import { MongoClient } from "mongodb";
import * as cookie from 'cookie';
import { MONGO_STRING } from "$env/static/private";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

export const POST = async ({request}) => {
    const { email, password } = await request.json();
    const user = await collection.findOne({ email });

    if(user.email === email && user.password === password) {
        const session = { authenticated: true, email: user.email };

        const cookieHeader = cookie.serialize("session", JSON.stringify(session), {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        });

        return new Response(JSON.stringify({message: "Success"}), {
            status: 201,
            headers: {
                "Set-Cookie": cookieHeader
            }
        });
    } else {
        return new Response(JSON.stringify({error: "User not found"}), {status: 404});
    }

    
}