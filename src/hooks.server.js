import { authenticate } from '$lib/server/authenticate';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    const isProtected = event.url.pathname.startsWith('/train');
    const auth = authenticate(event.cookies);

    if(isProtected && !auth) {
        throw redirect(307, "/login");
	}

	const response = await resolve(event);
	return response;
}