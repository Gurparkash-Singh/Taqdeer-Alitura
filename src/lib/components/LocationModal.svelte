<script>
	import { browser } from '$app/environment';
	import { numberFormat } from '$lib/shared_state/shared.svelte';

	let { display, closeDisplay, availableCountries, conversion_rates } = $props();

	let currency_code = browser ? localStorage.getItem('currency_code') : null;

	let selected_currency = $state(currency_code ? currency_code : 'SAR');

	let thisModal;

	function closeModal() {
		closeDisplay();
	}

	$effect(() => {
		if (browser) {
			localStorage.setItem('currency_code', selected_currency);
		}
		numberFormat.style.currency = selected_currency;
		numberFormat.conversion_rate = conversion_rates[numberFormat.style.currency];
	});
</script>

<svelte:window
	onclick={(e) => {
		if (event.target == thisModal) {
			closeModal();
		}
	}}
/>

<div class:display bind:this={thisModal}>
	<section>
		<button id="close-button" aria-label="close modal" onclick={closeModal}>
			<svg
				width="20"
				height="20"
				viewBox="0 0 50 50"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M48 2L2 48M2 2L48 48"
					stroke="#FFF"
					stroke-width="4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		<h3>Change Currency</h3>
		<select bind:value={selected_currency}>
			{#each availableCountries as country}
				<option value={country.currency_code}>
					{country.currency_code}
				</option>
			{/each}
		</select>
	</section>
</div>

<style>
	div {
		top: 0;
		left: 0;
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 10;
		display: none;
		background-color: #1e1e1e80;
		color: white;
		align-items: center;
		justify-content: center;
	}

	.display {
		display: flex;
	}

	section {
		background-color: #cb2d2d;
		width: min(300px, 80%);
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30px;
		color: white;
		min-width: 250px;
	}

	#close-button {
		background-color: #cb2d2d;
		color: white;
		border: none;
		position: absolute;
		top: 20px;
		left: 20px;
	}

	select {
		background-color: #d9d9d9;
		border: none;
		padding: 10px;
	}
</style>
