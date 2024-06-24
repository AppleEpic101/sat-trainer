export const load = async ({fetch}) => {
    const res = await fetch("/api/review/getReviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const reviews = await res.json();

    return {
        reviews
    }
}