import { login } from '$lib/server/login.js';
import { fail } from "@sveltejs/kit";

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const user = {
            email: data.get('email'),
            password: data.get('password'),
        }

        const response = await login(user);

        if (response.status !== 200) {
            return fail(response.status, {error: response.body.message});
        } else {
            const { token } = response;

            event.cookies.set('auth', token, {
                httpOnly: true,
                secure: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 30
            })

            return { token, message: "Logged in successfully."};
        }

    }
}