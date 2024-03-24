export const load = async ({fetch}) => {
    const res = await fetch("/api/user");
    return await res.json();
}