export const load = async ( {fetch, params} ) => {
    const res = await fetch("/api/review/review", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: params.id
        })
    })

    let review = await res.json();

    return {
        _id: params.id,
        ...review
    };
}