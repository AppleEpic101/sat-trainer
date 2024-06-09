<script>
    import { onMount } from 'svelte';
    import ReadingFocus from '$lib/modals/ReadingFocus.svelte';
    import Question from '$lib/components/Question.svelte';

    let showModal = false;
    let selectedSkillsArray;

    let data;
    let isLoading = true;
    let showAnswer, selectedAnswer;

    const fetchQuestion = async () => {
        isLoading = true;
        let res = await fetch("/api/getQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ section: "Reading", focus: selectedSkillsArray }),
        });
        data = await res.json();
        isLoading = false;
    }
    onMount(() => {
        fetchQuestion();
    });
</script>

<button on:click={() => (showModal = true)}> Change Reading Focus </button>

<div class="m-4">
    <div>
        {#if showAnswer}
            <button class="bg-cyan-500 w-full my-4 p-2 rounded-md" on:click={fetchQuestion}>Continue</button>
        {/if}
        <ReadingFocus bind:showModal bind:selectedSkillsArray />
        <Question {data} bind:isLoading bind:showAnswer bind:selectedAnswer />
    </div>
</div>


