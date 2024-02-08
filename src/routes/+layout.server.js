import { authenticate } from '$lib/server/authenticate';
export const load = async (event) => {
    return authenticate(event.cookies);
}