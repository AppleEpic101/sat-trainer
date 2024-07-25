export const load = async ( {fetch, params} ) => {
    const { id, versionNumber } = params;
    const res = await fetch("/api/review/review", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: id
        })
    })

    let review = await res.json();

    return {
        id, 
        versionNumber,
        version: review.versions[versionNumber - 1]
    }
}