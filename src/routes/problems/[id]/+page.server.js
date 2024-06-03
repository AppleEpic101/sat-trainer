let id;

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

    id = question.id.SAT;

    return {
        question: question,
        user: user,
    }
}

export const actions = {
    default: async ({request, fetch}) => {
        const data = await request.formData();

        const question = {
            source: data.get('source'),
            section: data.get('section'),
            questionType: data.get('questionType'),
            
            question: {
                stimulus: data.get('stimulus'),
                stem: data.get('stem'),
                answerOptions: [data.get('answerOption1'), data.get('answerOption2'), data.get('answerOption3'), data.get('answerOption4')],
            }
        }

        const res = await fetch('/api/updateQuestionData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                question: question
            })
        });
    }
}