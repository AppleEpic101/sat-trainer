import { register } from '$lib/server/register.js';
import { fail } from "@sveltejs/kit";

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const email = data.get('email');
        const password = data.get('password');

        const { error } = await register(email, password);

		if (error) {
			return fail(400, { error });
		} else {
			return { message: "Registration successful! You can now login." };
		}
    }
}