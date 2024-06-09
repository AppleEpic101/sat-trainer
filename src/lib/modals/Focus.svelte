<script>
	export let showModal; // boolean

	let dialog;
	$: if (dialog && showModal) dialog.showModal();

	export let skills;

	let domainSelections = {};
	let skillSelections = {};

	// Initialize selections
	$: {
		domainSelections = Object.keys(skills).reduce((acc, domain) => {
			acc[domain] = true;
			return acc;
		}, {});

		skillSelections = Object.keys(skills).reduce((acc, domain) => {
			acc[domain] = skills[domain].reduce((skillAcc, skill) => {
				skillAcc[skill] = true;
				return skillAcc;
			}, {});
			return acc;
		}, {});
	}

	export let selectedSkillsArray;
	$: selectedSkillsArray = Object.keys(skillSelections).reduce((acc, domain) => {
		acc.push(
			...Object.keys(skillSelections[domain]).filter((skill) => skillSelections[domain][skill])
		);
		return acc;
	}, []);

	// Toggle domain and its skills
	const toggleDomain = (domain) => {
		domainSelections[domain] = !domainSelections[domain];
		skills[domain].forEach((skill) => {
			skillSelections[domain][skill] = domainSelections[domain];
		});
	};

	// Toggle individual skill and check its domain
	const toggleSkill = (domain, skill) => {
		skillSelections[domain][skill] = !skillSelections[domain][skill];
		domainSelections[domain] = skills[domain].every((skill) => skillSelections[domain][skill]);
	};

	let allSelected = true;
	$: allSelected =
		Object.values(domainSelections).every(Boolean) &&
		Object.values(skillSelections).every((domain) => Object.values(domain).every(Boolean));

	const toggleAll = () => {
		allSelected = !allSelected;
		Object.keys(domainSelections).forEach((domain) => {
			domainSelections[domain] = allSelected;
			skills[domain].forEach((skill) => {
				skillSelections[domain][skill] = allSelected;
			});
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
{#if showModal}
	<dialog
		class="m-auto block w-full max-w-md p-6 bg-white rounded-md shadow-lg overflow-scroll"
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => dialog.close()}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex flex-col items-center" on:click|stopPropagation>
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog.close()}>Close</button>

			<div class="m-8">
				<p class="text-2xl">Change Reading Focus</p>
				<input type="checkbox" bind:checked={allSelected} on:click={toggleAll} />
				<label>All Reading Topics</label>
				{#each Object.keys(skills) as domain}
					<div>
						<input
							type="checkbox"
							bind:checked={domainSelections[domain]}
							on:click={() => toggleDomain(domain)}
						/>
						<label>{domain}</label>

						<div class="ml-4">
							{#each skills[domain] as skill}
								<div>
									<input
										type="checkbox"
										bind:checked={skillSelections[domain][skill]}
										on:click={() => toggleSkill(domain, skill)}
									/>
									<label>{skill}</label>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			<hr />
		</div>
	</dialog>
{/if}
