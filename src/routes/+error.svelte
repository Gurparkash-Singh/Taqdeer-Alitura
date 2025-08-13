<script>
	import { page } from '$app/state';
</script>

<main>
	<div id="image-holder">
		<a href="/">
			<img src="/Logo.svg" alt="Taqdeer Alitura Logo" id="Logo" />
		</a>
	</div>

	<section id="error-info">
		<h1>{page.status}</h1>
		<p>{page.error?.message}</p>
	</section>
</main>

<style>
	main {
		max-width: 500px;
		margin: auto;
	}
	#image-holder {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -28px;
	}

	#Logo {
		width: 170px;
		height: 170px;
	}

	#error-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
