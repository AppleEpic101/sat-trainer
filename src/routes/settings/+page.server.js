import { authenticate } from '$lib/server/authenticate';
import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

import { updateInfo } from "$lib/server/register.js";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

let id;

export const load = async ({fetch}) => {
    const res = await fetch("/api/user");
    const user = await res.json();
    id = user._id;
    return user;

    // const data = authenticate(event.cookies);
    // if(!data) return undefined;
    // const user = await collection.findOne({_id: new ObjectId(data.id)});
    // user._id = user._id.toString();
    // id = user._id;
    // return user;
}

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const user = {
            _id: id,
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
        }

        const res = await updateInfo(user);
    
        let { error, update } = res;
        
        if(error) {
            return { error };
        } else {
            return { message: "Update successful!", user: update };
        }
    }
    
}