<script>
	import { onMount } from "svelte";
	import { keysToCamelCase } from './utils'
	import Trends from './Trends.svelte';
	import Summary from './Summary.svelte';
	import Spinner from './Spinner.svelte';
	import Industries from './Industries.svelte';

	let data = {};
	let loading = true;

	onMount(async () => {
    await fetch('https://run.mocky.io/v3/a2cc3707-8691-4188-8413-6183a7bb3d32')
      .then(res => res.json())
			.then(raw => {data = keysToCamelCase(raw)})

		// To avoid flashes keep spinner running
		// for a little longer.
		setTimeout(() => {loading = false}, 200)
  })
</script>

<main>
	{#if loading}
		<div class="loading">Loading... please wait.</div>
		<Spinner />
	{:else}

		<h1>Occupation Overview</h1>
		<p>{data.occupation.title} in {data.region.title}</p>

		<Summary data={data.summary} />
		<Trends data={data.trendComparison} />
		<Industries data={data.employingIndustries} />

	{/if}
</main>

<style>
	* {
		font-family: 'Roboto', sans-serif;
	}

	.loading {
		text-align: center;
		padding: 2em;
	}
</style>