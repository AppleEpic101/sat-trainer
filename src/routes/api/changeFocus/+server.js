import { USERS } from "$lib/server/connect";

export const POST = async ({request}) => {
    const res = await request.json();

    let { user, newFocus, section } = res;

    if (section === "Reading") {
        await USERS.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "log.readingFocus": newFocus
        }});
    } else {
        await USERS.updateOne({ _id: new ObjectId(user._id) }, { $set: {
            "log.mathFocus": newFocus
        }});
    
    }

    return new Response(JSON.stringify(res), { status: 201 });
}