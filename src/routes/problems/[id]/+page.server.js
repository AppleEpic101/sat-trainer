export const load = async ({fetch, params}) => {
    const res = await fetch("/api/user");
    const user = await res.json();

    const qRes = await fetch('/api/getQuestionById', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: params.id
        })
    });
    const question = await qRes.json();

    return {
        question: question,
        user: user,
    }
}