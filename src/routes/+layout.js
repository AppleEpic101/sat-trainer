import { user, userEmail, userBasic } from '$lib/stores/user';

export const load = async ({ fetch }) => {
    const res = await fetch("/api/user");
    const data = await res.json();

    user.set(data);
    userEmail.set({
        _id: data._id,
        username: data.username,
        email: data.email
    });
    userBasic.set({
        _id: data._id,
        username: data.username,
        meta: data.meta
    });

    return {};
}