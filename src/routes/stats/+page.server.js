export const load = async ({fetch}) => {
    const overallRes = await fetch("/api/getLeaderboardStats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sortArgument: { "stats.rating": -1 } })
    });

    let overall = await overallRes.json();

    return {
        overall: overall
    }
}