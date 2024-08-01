import { RW, MATH } from "$lib/server/connect";

export const POST = async ({request}) => {
    const res = await request.json();
    const { section, focus, query } = res;

    let match = {};
    for (let key in query) {
        if (Array.isArray(query[key]) && query[key].length !== 0) {
            query[key] = query[key].flat();
            match[key] = { $in: query[key] };
        } else if (query[key].length !== 0) {
            match[key] = query[key];
        }
    }

    let collection = section === "Reading" ? RW : MATH;

    let data = await collection.aggregate([{ $match: match}, { $sample: { size: 1 } }]).toArray(); // single document

    return new Response(JSON.stringify(data[0]), { status: 201 });
}