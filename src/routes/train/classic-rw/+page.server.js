export const load = async ({fetch, depends}) => {
    depends("var");

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
    
    console.log("SERVER QUESTION", data.question.id.SAT)
    return {
        user,
        question: data.question,
    };
    
}