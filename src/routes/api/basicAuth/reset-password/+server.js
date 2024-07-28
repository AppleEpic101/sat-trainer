import { resetPassword } from "$lib/server/register.js";

export async function POST({ request }) {
    const { token, newPassword } = await request.json();
    const result = await resetPassword(token, newPassword);

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