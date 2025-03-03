<script>
    import Logo from '$lib/images/Logo.png?enhanced';
    import { modal } from '$lib/shared_state/shared.svelte';

    let { form, data } = $props();

    let formElement;

    let service = $state("");

    let otp = $state("");
    let enableSubmit = $state(true);

    let time = $state("");

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        service = form.service;

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
    else if (data.wait) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == data.wait) {
                inMessages = true;
            }
        }

        service = data.service;

        if (!inMessages && data.wait) 
        {
            modal.messages.push({
                heading: "ERROR",
                paragraph: data.wait
            });
        }
    }
    else {
        service = data.service;
    }

    $effect(() => {
        if (otp.length >= 6) {
            formElement.submit();
        }
    })

    function onReload() {
        enableSubmit = false;

        if (data.time) {
            time = data.time;
            const newInterval = setInterval(() => {
                time -= 1;
            }, 1000)

            setTimeout(() => {
                enableSubmit = true;

                clearInterval(newInterval);

                time = "";
            }, (data.time * 1000));
        } else {
            time = "";
        }
    }

    onReload()
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>

    <section>
        <h1>VERIFY ACCOUNT</h1>
        <form 
            action="?/submit" 
            method="POST"
            bind:this={formElement}
        >
            <input 
                type="hidden" 
                name="service"
                bind:value={service}
            />
            <p>
                <label for="otp">code:</label>
                <input 
                    type="text" 
                    name="otp" 
                    id="otp"
                    bind:value={otp}
                />
            </p>
            <div id="button-holder">
                <button 
                    class:disable-submit={!enableSubmit}
                    disabled={!enableSubmit}
                    formaction="?/send"
                >
                    Send OTP
                </button>
                
                {#if time}
                    <p>
                        {time}s
                    </p>
                {/if}
                
            </div>
        </form>
    </section>
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

    h1 {
        color: #bf1e2e;
    }

    section {
        width: 80%;
    }

    form p {
        display: flex;
        flex-direction: column;
    }

    form label {
        margin-bottom: 5px;
    }

    form p input {
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
    }

    form button {
        background-color: #bf1e2e;
        color: white;
        border: none;
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .disable-submit {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0;
    }

    #button-holder {
        justify-content: flex-start;
        align-items: center;
        margin: 20px 0;
    }

    #button-holder p {
        margin: 10px;
    }
</style>

