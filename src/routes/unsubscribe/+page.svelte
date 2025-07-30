<script>
    import BackgroundImage from "$lib/images/homepage.jpg";
    import { modal } from '$lib/shared_state/shared.svelte';

    let { form, data } = $props();

    let token = $state(data.token);

    let success = $state(false);

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (form.invalid) {
            token = form.token
        }

        if (form.success) {
            success = true;
        }

        if (!inMessages && form.invalid) 
        {
            modal.messages.push({
                heading: "ERROR",
                paragraph: form.message
            });
        }else if (!inMessages && form.success) {
            modal.messages.push({
                heading: "SUCCESS",
                paragraph: form.message
            });
        }
    }
</script>

<div id="image-holder">
    <img 
        src={BackgroundImage} 
        alt="background"
        style:object-fit="cover"
        style:object-position="center center"
        style:width="100vw"
        style:height="100vh"
    >
</div>

<main>
    <div id="logo-holder">
        <a href="/" aria-label="Link to Home">
            <img src="/Logo2.svg" alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
    </div>
	<section id="contact">
        {#if !success}
            <h1>Unsubscribe?</h1>
            <p>We'll stop sending emails to you right away if you confirm.</p>
            <form action="?/submit" method="post">
                <input type="hidden" name="token" value={token}>
                <button type="submit">unsubscribe</button>
            </form>
        {/if}
        <a href="/">home</a>
	</section>
</main>

<style>
	main {
		margin: auto;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 2;
		color: white;
        align-items: center;
        height: 100vh;
	}

	#image-holder {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}

	#contact {
		display: flex;
		flex-direction: column;
        align-items: center;
		justify-content: center;
		padding: 15px 25px;
		background-color: #cb2d2d;
		color: white;
        position: relative;
        font-size: 14px;
	}

    #contact h1 {
        margin: 20px 0 0 0;
    }

    #contact a {
        color: white;
        margin: 20px 0;
    }

    form button {
        background: white;
        border: none;
        padding: 5px 20px;
        cursor: pointer;
        color: #1E1E1E;
    }

    #logo-holder {
		display: flex;
		justify-content: center;
		width: 100%;
        height: 140px;
        margin: -175px 0 35px 0;
	}

	#Logo {
		height: 140px;
	}
</style>