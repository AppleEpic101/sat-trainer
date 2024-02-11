import { register } from '$lib/server/register.js';
import { fail } from "@sveltejs/kit";

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const user = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
        }

        const { error } = await register(user);

		if (error) {
			return fail(400, { error });
		} else {
			return { message: "Registration successful! You can now login." };
		}
    }
}