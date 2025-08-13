<script>
	import { modal } from '$lib/shared_state/shared.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';

	let { data, display, closeDisplay, selectImage } = $props();

	let thisModal;

	function closeModal() {
		closeDisplay();
	}
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
		<ImageCarousel {data} {selectImage} {display} />
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
		background-color: #1e1e1ef0;
		color: white;
		align-items: center;
		justify-content: center;
	}

	.display {
		display: flex;
	}

	section {
		width: 90%;
		height: 90%;
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
		background-color: transparent;
		color: white;
		border: none;
		position: absolute;
		top: 0;
		left: 0;
	}

	@media screen and (width > 700px) {
		#close-button {
			left: 25%;
		}
	}
</style>
