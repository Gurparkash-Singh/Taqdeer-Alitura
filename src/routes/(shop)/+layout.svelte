<script>
    let { children } = $props();
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <img src="/Logo.svg" alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>

    {@render children()}
</main>

<style>
	main {
		max-width: 500px;
		margin: auto;
        padding-bottom: 100px;
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
</style>
