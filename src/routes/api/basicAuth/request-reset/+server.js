import { requestPasswordReset } from "$lib/server/passwordReset.js";

export async function POST({ request }) {
    const { email } = await request.json();
    const result = await requestPasswordReset(email);

    if (result.error) {
        return {
            status: 400,
            body: { error: result.error }
        };
    }

    return {
        status: 200,
        body: { message: result.message }
    };
}