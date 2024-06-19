export const load = async ({fetch, url}) => {
    const search = url.searchParams.get('search') || '';
    
    const res = await fetch('/api/questionTextSearch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: search,
            section: 'Math'
        })
    });
    return {
        questions: await res.json(),
        query: search
    }
}