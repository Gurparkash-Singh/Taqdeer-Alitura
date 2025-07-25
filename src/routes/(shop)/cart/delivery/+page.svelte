<script>
    import { modal } from '$lib/shared_state/shared.svelte';
    import Map from '$lib/components/Map.svelte';
    import { getCountries, getCountryCallingCode, AsYouType } from 'libphonenumber-js';
	import { isValidPhoneNumber } from 'libphonenumber-js/max';

    let { data, form } = $props();

    let addressName = $state("");
    let address1 = $state("");
    let address2 = $state("");
    let city = $state("");
    let province = $state("");
    let postal_code = $state("");
    let country = $state("");
    let formalAddress = $state("");
    let manual = $state(false);
    let selected_address = $state("save");

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
    else {
        selected_address = "add";
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
                postal_code = value.replace(" ", "");
                break;
            case "a1":
                address1 = value;
                break;
            case "formalAddress":
                formalAddress = value;
                manual = false;
                if (selected_address === "save") {
                    showMessage = true;
                }
                break;
        }
    }

    function manualEntry() {
        showMessage = true;
        manual = true;
    }

    let enableSubmit = $derived.by(() => {
        if (countryCode) {
            if(isValidPhoneNumber(phoneNumber, countryCode)) {
                const returnVal = name && email && address1;
                if (!showMessage) {
                    return returnVal && formalAddress;
                }

                if (selected_address === "save") {
                    return returnVal && city && postal_code && province && country && addressName;
                }
                return returnVal && city && postal_code && province && country;
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
            phoneNumber = form.phone,

            address1 = form.address1;
            address2 = form.address2;
            city = form.city;
            province = form.province;
            postal_code = form.postal;
            country = form.delivery_country;

            manual = true;
            showMessage = true;
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
        address1 = data.existing_order.address1;
        address2 = data.existing_order.address2;
        city = data.existing_order.city;
        province = data.existing_order.province;
        postal_code = data.existing_order.postal;
        country = data.existing_order.delivery_country;

        if (data.existing_order.address_id) {
            for (let i = 0; i < data.addresses.length; i++) {
                if (data.existing_order.address_id == data.addresses[i].address_id){
                    selected_address = data.addresses[i];
                    break;
                }
            }
        }
        else {
            selected_address = "add";
        }

        manual = true;
        showMessage = true;
    }

    function valueChange(address) {
        address1 = address.address_line1;
        address2 = address.address_line2;
        city = address.city;
        postal_code = address.postal_code;
        province = address.province;
        country = address.country;

        manual = true;
        showMessage = true;
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
        <input 
            type="hidden"
            name="manual-entry"
            bind:value={manual}
        />
        <input 
            type="hidden"
            name="address-id"
            value={selected_address === "save" ? 0 : selected_address.address_id}
        />
        {#if !data.user}
            <a href="/profile">login to access addresses</a>
        {:else}
            <select 
                name="saved-address" 
                id="saved-address"
                onchange={(e) => {
                    if (selected_address != "add" || selected_address != "save") {
                        valueChange(selected_address);
                    }
                    else {
                        valueChange({});
                    }
                }}
                bind:value={selected_address}
            >
                {#each data.addresses as address}
                    <option value={address}>{address.address_name}</option>
                {/each}
                <option value="save" selected>save an address</option>
                <option value="add">enter an address</option>
            </select>
        {/if}
        <fieldset 
            class:delivery-visible={showMessage}
            class:delivery-invisible={!showMessage}
        >
            <legend>Delivery Information</legend>
            {#if selected_address === "save"}
                <p>
                    <label for="addressName">address name:</label>
                    <input 
                            type="text" 
                            name="addressName" 
                            id="addressName"
                            required
                            bind:value={addressName}
                    >
                </p>
            {/if}
            <p>
                <label for="address1">address line 1:</label>
                <input 
                        type="text" 
                        name="address1" 
                        id="address1"
                        required
                        bind:value={address1}
                >
            </p>
            <p>
                <label for="address2">address line 2 (optional):</label>
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
                    required
                    bind:value={city}
                >
            </p>
            <p>
                <label for="province">state/province:</label>
                <input 
                    type="text" 
                    name="province" 
                    id="province"
                    required
                    bind:value={province}
                >
            </p>
            <p>
                <label for="postal">postal code:</label>
                <input 
                    type="text" 
                    name="postal" 
                    id="postal"
                    required
                    bind:value={postal_code}
                >
            </p>
            <p>
                <label for="delivery_country">country code:</label>
                <select
                    name="delivery_country"
                    id="delivery_country"
                    required
                    bind:value={country}
                >
                    {#each getCountries() as country}
                        {#if country != "IL"}
                            <option value={country}>
                                {regionNames.of(country)}: {country}
                            </option>
                        {/if}
                    {/each}
                </select>
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
                    required
                    bind:value={name}
                />
            </p>
            <p>
                <label for="email">email:</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email"
                    required
                    bind:value={email}
                />
            </p>
            <p>
                <label for="country">country:</label>
                <select
                    name="country"
                    id="country"
                    required
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
                    required
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
    form {
        margin: 0;
    }

    form > a {
        width: 100%;
        text-align: center;
        display: block;
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
        text-decoration: none;
    }

    #saved-address {
        width: 100%;
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
        text-align: center;
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

    @media screen and (width < 800px) {
        fieldset {
            grid-template-columns: 1fr;
        }

        form p {
            margin: 10px 0;
        }

        legend {
            padding: 20px 0;
        }

        form p input, form p select {
            width: 100%;
        }

    }
</style>