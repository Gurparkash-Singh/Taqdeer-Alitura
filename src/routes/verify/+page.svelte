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

    <h1>Verify Email</h1>
    <p>An email verification link has been sent, please use it to verify your email</p>
</main>

<style>
	main {
		display: flex;
        flex-direction: column;
		justify-content: center;
        align-items: center;
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

