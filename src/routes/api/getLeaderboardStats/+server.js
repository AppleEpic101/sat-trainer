import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";
import { blacklist } from "$lib/util.js";

const client = await MongoClient.connect(MONGO_STRING);
const accounts = client.db("accounts");
const users = accounts.collection("users");

export const POST = async ({request}) => {
    const res = await request.json();
    const { sortArgument } = res;

    let data = await users.find({}, blacklist).sort(sortArgument).toArray();
    return new Response(JSON.stringify(data), { status: 201 });
}