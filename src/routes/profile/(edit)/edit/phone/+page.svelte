<script>
    import { modal } from '$lib/shared_state/shared.svelte';
    import { getCountries, getCountryCallingCode, AsYouType } from 'libphonenumber-js';
	import { isValidPhoneNumber } from 'libphonenumber-js/max';

    let { data, form } = $props();

    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

    let userPhone = $state("");

    if (data.user.phone) {
        userPhone = new AsYouType(data.user.country).input(data.user.phone);
    }

    let countryCode = $state(data.user ? data.user.country : "SA");
    let phoneNumber = $state(data.user ? data.user.phone : "");

    let enableSubmit = $derived.by(() => {
        if ( userPhone == phoneNumber) {
            return false;
        }
        if (countryCode) {
            if(isValidPhoneNumber(phoneNumber, countryCode)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    });

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (form.invalid) {
            countryCode = form.country;
            phoneNumber = form.phone;
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

    $effect(() => {
        phoneNumber = new AsYouType(countryCode).input(phoneNumber)
    })
</script>

<section>
    <form action="?/submit" method="POST">
        <p>
            <label for="country">country:</label>
            <select 
                name="country"
                id="country"
                bind:value={countryCode}
            >
                {#each getCountries() as country}
                    {#if country != "IL"}
                        <option value={country}>
                            {regionNames.of(country)}: +{getCountryCallingCode(country)}
                        </option>
                    {/if}
                {/each}
            </select>
        </p>
        <p>
            <label for="phone">phone number:</label>
            <input 
                type="tel"
                name="phone"
                id="phone"
                bind:value={phoneNumber}
            >
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

    form p {
        display: flex;
        flex-direction: column;
    }

    form label {
        margin-bottom: 5px;
    }

    form p input, form p select {
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