export const load = async ({fetch}) => {
    const userRes = await fetch("/api/user");
    const user = await userRes.json();

    const res = await fetch("/api/log/getLog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user, section: "Reading" })
    });

    const data = await res.json();

    return data;
    
}