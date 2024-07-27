import { OAuth2Client } from 'google-auth-library';
import { MongoClient } from 'mongodb';
import { MONGO_STRING, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_KEY } from '$env/static/private';
import { redirect } from "@sveltejs/kit";
import { ACCOUNT_INIT } from "$lib/type.js";
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'http://localhost:5173/oauth');
const mongoClient = await MongoClient.connect(MONGO_STRING);
const db = mongoClient.db("accounts");
const collection = db.collection("users");

export const GET = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    if (!code) {
        const authUrl = client.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email'],
        });
        return new Response(null, { status: 302, headers: { Location: authUrl } });
    }

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await collection.findOne({ $or: [{ oauthId: sub }, { email: email }] });
    if (!user) {
        // Ensure the username is unique
        let uniqueUsername = name;
        let usernameExists = await collection.findOne({ username: uniqueUsername });
        let counter = 1;
        while (usernameExists) {
            uniqueUsername = `${name}${counter}`;
            usernameExists = await collection.findOne({ username: uniqueUsername });
            counter++;
        }

        // Create a new account if the user does not exist
        user = {
            username: uniqueUsername,
            email: email,
            oauthId: sub,
            ...ACCOUNT_INIT
    };
    await collection.insertOne(user);
    } else if (!user.oauthId) {
        // Merge accounts if the user exists with the same email but without oauthId
        user.oauthId = sub;
        await collection.updateOne({ _id: user._id }, { $set: { oauthId: sub } });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_KEY);
    cookies.set('auth', token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30
    });

    throw redirect(303, "/");
};