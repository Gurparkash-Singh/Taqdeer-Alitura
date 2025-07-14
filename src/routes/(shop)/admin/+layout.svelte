<script>
    let { children, data } = $props();
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <img src="/Logo.svg" alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>

    <h1>Welcome, Admin</h1>

    {@render children()}
</main>

<style>
	main {
		max-width: 500px;
		margin: auto;
        width: 80%;
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

    h1 {
        color: #BF1E2E;
    }
</style>
