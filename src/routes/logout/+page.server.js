import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async (event) => {
        event.cookies.delete('auth', { path: '/' });
        throw redirect(301, "/");
    }
}