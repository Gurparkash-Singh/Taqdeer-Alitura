<script>
	import { modal } from '$lib/shared_state/shared.svelte';
	import AddressBookMap from '$lib/components/AddressBookMap.svelte';

	let { data, form } = $props();

    let name = $state("");
	let address1 = $state('');
	let address2 = $state('');
	let city = $state('');
	let province = $state('');
	let postal_code = $state('');
	let country = $state('');
	let formattedAddress = $state('');
	let manual = $state(true);
    let selected_address = $state("add");

    let address_id = $derived.by(() => {
        if (selected_address == "add") {
            return 0;
        }
        else {
            return selected_address.address_id;
        }
    })

	function setValue(name, value) {
		switch (name) {
			case 'locality':
				city = value;
				break;
			case 'administrative_area_level_1':
				province = value;
				break;
			case 'country':
				country = value;
				break;
			case 'postal_code':
				postal_code = value.replace(' ', '');
				break;
			case 'a1':
				address1 = value;
				break;
			case 'formalAddress':
				formattedAddress = value;
				manual = false;
				break;
		}
	}

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (form.invalid) {
            name = form.name
            address1 = form.address1;
            address2 = form.address2;
            city = form.city;
            province = form.province;
            postal_code = form.postal;
            country = form.delivery_country;
            manual = true;

            if (form.address_id > 0) {
                for (let i = 0; i < data.addresses.length; i++) {
                    if (data.addresses[i].address_id == form.address_id) {
                        selected_address = data.addresses[i];
                    }
                }
            }
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

    function valueChange(address) {
        name = address.address_name;
        address1 = address.address_line1;
        address2 = address.address_line2;
        city = address.city;
        postal_code = address.postal_code;
        province = address.province;
        country = address.country;
    }

    let enableSubmit = $derived.by(() => {
        if (!manual) {
            return formattedAddress && name;
        }
        else {
            return address1 && city && postal_code && province && country && name;
        }
    });
</script>

<section>
    <AddressBookMap
        setValue={setValue}
    />
    <form action="?/create" method="POST">
        <input 
            type="hidden"
            name="formatted-address"
            bind:value={formattedAddress}
        />
        <input 
            type="hidden"
            name="manual-entry"
            bind:value={manual}
        />
        <input 
            type="hidden" 
            name="address-id"
            value={address_id}
        >
        <select 
            name="saved-address" 
            id="saved-address"
            onchange={(e) => {
                if (selected_address != "add") {
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
            <option value="add" selected>Add Address</option>
        </select>
        <fieldset>
            <p>
                <label for="name">name:</label>
                <input 
                        type="text" 
                        name="name" 
                        id="name"
                        bind:value={name}
                >
            </p>
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
                <label for="delivery_country">country code:</label>
                <input 
                    type="text" 
                    name="delivery_country" 
                    id="delivery_country"
                    bind:value={country}
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
        margin-top: -40px;
    }

    form {
        margin: 0;
    }

    #saved-address {
        width: 100%;
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
    }
    
    /* legend {
        width: 100%;
        padding: 20px;
        font-size: 1.5em;
        border-bottom: 2px solid #D9D9D9;
        grid-column-start: 1;
        grid-column-end: 3;
        margin: 10px 0;
    } */

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
</style>
