<script>
    import { modal } from '$lib/shared_state/shared.svelte';
    import Map from '$lib/components/Map.svelte';
    import { getCountries, getCountryCallingCode, AsYouType } from 'libphonenumber-js';
	import { isValidPhoneNumber } from 'libphonenumber-js/max';
    import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';

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
    let province = $state("");
    let postal_code = $state("");
    let country = $state("");
    let formalAddress = $state("");

    let name = $state(data.user ? data.user.name : "");
    let email = $state(data.user ? data.user.email : "");
    let showMessage = $state(false);

    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    let countryCode = $state("SA");
    let phoneNumber = $state("");

    if (data.user) {
        if (data.user.phone) {
            countryCode = data.user.country;
            phoneNumber = new AsYouType(data.user.country).input(data.user.phone);
        }
    }

    $effect(() => {
        if (phoneNumber) {
            phoneNumber = new AsYouType(countryCode).input(phoneNumber)
        }
    })

    function setValue(name, value) {
        switch(name){
            case "locality":
                city = value;
                break;
            case "administrative_area_level_1":
                province = value;
                break;
            case "country":
                country = value;
                break;
            case "postal_code":
                postal_code = value;
                break;
            case "a1":
                address1 = value;
                break;
            case "formalAddress":
                formalAddress = value;
                break;
        }
    }

    function manualEntry() {
        showMessage = true;
    }

    let enableSubmit = $derived.by(() => {
        if (countryCode) {
            if(isValidPhoneNumber(phoneNumber, countryCode)) {
                if (!showMessage) {
                    return name && email && address1 && formalAddress;
                }

                return name && email && address1 && city && postal_code && province && country;
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
            email = form.email;
            name = form.name;
            countryCode = form.country,
            phoneNumber = form.phone
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

    if (data.existing_order) {
        email = data.existing_order.email;
        name = data.existing_order.name;
        countryCode = data.existing_order.country,
        phoneNumber = data.existing_order.phone
    }
</script>

<Map 
    setValue={setValue}
    manualEntry={manualEntry}
/>

<section>
    <form action="?/create" method="POST">
        <input 
            type="hidden"
            name="formatted-address"
            bind:value={formalAddress}
        />
        <fieldset 
            class:delivery-visible={showMessage}
            class:delivery-invisible={!showMessage}
        >
            <legend>Delivery Information</legend>
            <p>
                <label for="address1">address line 1:</label>
                <input 
                        type="text" 
                        name="address1" 
                        id="address1"
                        bind:value={address1}
                >
            </p>
            <p>
                <label for="address2">address line 2:</label>
                <input 
                    type="text" 
                    name="address2" 
                    id="address2"
                    bind:value={address2}
                >
            </p>
            <p>
                <label for="city">city:</label>
                <input 
                    type="text" 
                    name="city" 
                    id="city"
                    bind:value={city}
                >
            </p>
            <p>
                <label for="province">state/province:</label>
                <input 
                    type="text" 
                    name="province" 
                    id="province"
                    bind:value={province}
                >
            </p>
            <p>
                <label for="postal">postal code:</label>
                <input 
                    type="text" 
                    name="postal" 
                    id="postal"
                    bind:value={postal_code}
                >
            </p>
            <p>
                <label for="delivery_country">country:</label>
                <input 
                    type="text" 
                    name="delivery_country" 
                    id="delivery_country"
                    bind:value={country}
                >
            </p>
        </fieldset>

        <fieldset>
            <legend>Contact Info</legend>
            <p>
                <label for="name">full name:</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    bind:value={name}
                />
            </p>
            <p>
                <label for="email">email:</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email"
                    bind:value={email}
                />
            </p>
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
        </fieldset>
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

    form {
        margin: 0;
    }
    
    legend {
        width: 100%;
        padding: 20px;
        font-size: 1.5em;
        border-bottom: 2px solid #D9D9D9;
        grid-column-start: 1;
        grid-column-end: 3;
        margin: 10px 0;
    }

    fieldset {
        border: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    form p {
        display: flex;
        flex-direction: column;
        margin: 10px;
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
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
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

    .delivery-visible {
        display: grid;
    }

    .delivery-invisible {
        display: none;
    }
</style>