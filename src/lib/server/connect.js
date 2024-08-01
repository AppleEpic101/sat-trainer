import { MongoClient } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);

const questions = client.db("questions");
const accounts = client.db("accounts");

export const ReviewBoard = questions.collection("review-board");
export const RW = questions.collection("rw");
export const MATH = questions.collection("math");
export const USERS = accounts.collection("users");

