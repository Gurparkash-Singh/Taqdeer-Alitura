<script>
    import Logo from '$lib/images/Logo.png?enhanced';

    let { children, data } = $props();
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>

    <h1>Welcome, {data.user.name}</h1>

    {@render children()}
</main>

<style>
	main {
		max-width: 500px;
		margin: auto;
        width: 80%;
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

    h1 {
        color: #BF1E2E;
    }
</style>
