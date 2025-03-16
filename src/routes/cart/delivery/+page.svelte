<script>
    import { modal } from '$lib/shared_state/shared.svelte';

    let { data, form } = $props();

    if (data.infoUpdated) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == "updated order information") {
                inMessages = true;
            }
        }

        if (!inMessages) {
            modal.messages.push({
                heading: "Success",
                paragraph: "updated order information"
            });
        }
    }

    let address1 = $state("");
    let address2 = $state("");
    let city = $state("");
    let postal_code = $state("");

    let enableSubmit = $derived.by(() => {
        return address1 && city && postal_code;
    });

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (form.invalid) {
            email = form.email;
        }

        if (!inMessages && form.invalid) 
        {
            modal.messages.push({
                heading: "ERROR",
                paragraph: form.message
            });
        }else if (!inMessages && form.success) {
            modal.messages.push({
                heading: "Success",
                paragraph: form.message
            });
        }
    }
</script>

<section>
    <h1>Delivery Information</h1>
    <form action="?/login" method="POST">
        <p>
           <label for="address1">address line 1:</label>
           <input type="text" name="address1" id="address1">
        </p>
        <p>
            <label for="address2">address line 2:</label>
            <input type="text" name="address2" id="address2">
        </p>
        <p>
            <label for="city">city:</label>
            <input type="text" name="city" id="city">
        </p>
        <p>
            <label for="postal">postal code:</label>
            <input type="text" name="postal" id="postal">
        </p>
        <p>
            <label for="country">country:</label>
            <input type="text" name="country" id="country">
        </p>
        <button 
            type="submit"
            class:disable-submit={!enableSubmit}
            disabled={!enableSubmit}
        >
            Continue
            <svg width="10" height="10" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
            </svg>
        </button>
    </form>
</section>

<style>
    section {
        max-width: 80%;
        margin: auto;
    }
    
    h1 {
        color: #bf1e2e;
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
        margin: 20px 0;
        background-color: #bf1e2e;
        color: white;
        border: none;
        padding: 10px 10px;
        width: 100px;
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

    .disable-submit svg path {
        fill: #1E1E1E80;
    }
</style>