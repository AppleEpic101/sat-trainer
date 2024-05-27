export const load = async ({fetch}) => {
    const res = await fetch('/api/getQuestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limit: 25,
            section: 'Reading'
        })
    });
    return {
        questions: await res.json()
    }
}