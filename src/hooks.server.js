import { authenticate } from '$lib/server/authenticate';
import { redirect } from '@sveltejs/kit';


import { MongoClient, ObjectId } from "mongodb";
import { MONGO_STRING } from "$env/static/private";

const client = await MongoClient.connect(MONGO_STRING);
const db = client.db("accounts");
const collection = db.collection("users");

const loginProtected = ['/train', '/dashboard', '/settings', '/review', '/create', '/question', '/problems']
const reviewerProtected = ['/review', '/create', '/question', '/problems']
const adminProtected = ['/review', '/create', '/question', '/problems']

export const handle = async ({ event, resolve }) => {
    const pathname = event.url.pathname;
    const auth = authenticate(event.cookies);

    if (!auth) {
        if (loginProtected.some(route => pathname.startsWith(route))) {
            throw redirect(307, "/login");
        }
    } else {
        const user = await collection.findOne({ _id: new ObjectId(auth.id) });
        let isAdmin = user.meta.isAdmin;
        let isReviewer = user.meta.isReviewer;

        if(isAdmin) isReviewer = true;

        if (adminProtected.some(route => pathname.startsWith(route)) && !isAdmin) {
            throw redirect(307, "/");
        } 
        
        if (reviewerProtected.some(route => pathname.startsWith(route)) && !isReviewer) {
            throw redirect(307, "/");
        }
    }

	const response = await resolve(event);
	return response;
}