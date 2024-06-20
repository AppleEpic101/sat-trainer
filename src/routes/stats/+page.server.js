import { READING_DOMAIN_LIST, READING_SKILL_LIST, MATH_DOMAIN_LIST, MATH_SKILL_LIST } from "$lib/util.js";

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
    
    let mathLeaderboard = {};

    for (let i = 0; i < MATH_DOMAIN_LIST.length; i++) {
        const res = await fetch("/api/getLeaderboardStats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sortArgument: { [`math.${MATH_DOMAIN_LIST[i]}`]: -1 } })
        });
        mathLeaderboard[MATH_DOMAIN_LIST[i]] = await res.json();
    }

    for (let i = 0; i < MATH_SKILL_LIST.length; i++) {
        const res = await fetch("/api/getLeaderboardStats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sortArgument: { [`math.${MATH_SKILL_LIST[i]}`]: -1 } })
        });
        mathLeaderboard[MATH_SKILL_LIST[i]] = await res.json();
    }


    const overallRes = await fetch("/api/getLeaderboardStats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sortArgument: { ["stats"]: -1 } })
    });

    let overall = await overallRes.json();

    const overallReadingRes = await fetch("/api/getLeaderboardStats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sortArgument: { ["reading"]: -1 } })
    });

    let overallReading = await overallReadingRes.json();

    const overallMathRes = await fetch("/api/getLeaderboardStats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sortArgument: { ["math"]: -1 } })
    });

    let overallMath = await overallMathRes.json();

    return {
        overall,
        overallReading,
        overallMath,
        readingLeaderboard,
        mathLeaderboard
    }
}