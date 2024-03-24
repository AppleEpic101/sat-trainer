export const load = async ({fetch}) => {
    const res = await fetch("/api/user");
    const user = await res.json();
    return user;
}