<script>
    import Logo from '$lib/images/Logo.png?enhanced';

    let { children } = $props();
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>

    {@render children()}
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
</style>
