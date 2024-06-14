import { READING_DOMAIN_LIST, READING_SKILL_LIST, MATH_SKILLS } from "$lib/util.js";

export const load = async ({fetch}) => {
    let readingLeaderboard = {};

    for (let i = 0; i < READING_DOMAIN_LIST.length; i++) {
        const res = await fetch("/api/getLeaderboardStats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sortArgument: { [`reading.${READING_DOMAIN_LIST[i]}`]: -1 } })
        });
        readingLeaderboard[READING_DOMAIN_LIST[i]] = await res.json();
    }

    for (let i = 0; i < READING_SKILL_LIST.length; i++) {
        const res = await fetch("/api/getLeaderboardStats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sortArgument: { [`reading.${READING_SKILL_LIST[i]}`]: -1 } })
        });
        readingLeaderboard[READING_SKILL_LIST[i]] = await res.json();
    }
    

    const overallRes = await fetch("/api/getLeaderboardStats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sortArgument: { "stats.experience": -1 } })
    });

    let overall = await overallRes.json();

    return {
        overall: overall,
        readingLeaderboard
    }
}