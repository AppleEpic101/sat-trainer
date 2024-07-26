// src/routes/oauth/+page.server.js
import { OAuth2Client } from 'google-auth-library';
import { MongoClient } from 'mongodb';
import { MONGO_STRING, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'http://localhost:3000/oauth/callback');
const mongoClient = await MongoClient.connect(MONGO_STRING);
const db = mongoClient.db("accounts");
const collection = db.collection("users");

export const GET = async ({ url }) => {
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

    let user = await collection.findOne({ oauthId: sub });
    if (!user) {
        user = {
            username: name,
            email: email,
            oauthId: sub,
            // other user fields
        };
        await collection.insertOne(user);
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_KEY);
    return new Response(JSON.stringify({ token }), { status: 200 });
};