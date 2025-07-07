<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";
    import { modal } from "$lib/shared_state/shared.svelte";

    let {data, form} = $props();

    let selectedProperty = $state("Add");
    let newName = $state("");
    let value = $state("");

    let enableSubmit = $derived.by(() => {
        if (selectedProperty == "Add"){
            if (newName) {
                return true;
            }
        }

        for (let i = 0; i < data.properties.length; i++) {
            if (data.properties[i].property_id == selectedProperty) {
                if (newName && data.properties[i].property_name != newName) {
                    return true;
                }

                if (data.properties[i].property_value != value) {
                    return true;
                }
            }
        }

        return false;
    });

    let enableDelete = $derived.by(() => {
        for (let i = 0; i < data.properties.length; i++) {
            if (data.properties[i].property_id == selectedProperty) {
                return true;
            }
        }

        return false;
    })

    let submitValue = $derived.by(() => {
        if (selectedProperty == "Add") {
            return "Add";
        }
        return "Update";
    });

    $effect(() => {
        if (selectedProperty == "Add"){
            newName = "";
            value = "";
        }
        else {
            for (let i = 0; i < data.properties.length; i++) {
                if (data.properties[i].property_id == selectedProperty) {
                    newName = data.properties[i].property_name;
                    value = data.properties[i].property_value;
                }
            }
        }
    })

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
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
                heading: "SUCCESS",
                paragraph: form.message
            });
        }
    }
</script>

<AdminBackButton 
    link={`./`} 
    name={`${data.product.name} Panel`}
/>

<section>
   <form action="?/submit" method="POST">
        <p>
            <label for="currentProperty">component:</label>
            <select 
                name="currentProperty"
                id="currentProperty"
                bind:value={selectedProperty}
            >
                {#each data.properties as property}
                    <option value={property.property_id}>
                        {property.property_name}
                    </option>
                {/each}
               <option value="Add">Add New Property</option>
            </select>
        </p>
        <p>
            <label for="property_name">property name:</label>
            <input 
                type="text"
                name="property_name"
                id="property_name"
                bind:value={newName}
            >
        </p>
        <p>
            <label for="property_value">property value:</label>
            <input 
                type="text"
                name="property_value"
                id="property_value"
                bind:value={value}
            >
        </p>
        <div>
            <button 
                type="submit"
                class:disable-submit={!enableSubmit}
                disabled={!enableSubmit}
            >
                {submitValue}
                <svg width="10" height="10" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
                </svg>
            </button>
            <button 
                type="submit"
                class:disable-submit={!enableDelete}
                disabled={!enableDelete}
                id="deleteButton"
                formaction="?/delete"
            >
                Delete
                <svg width="10" height="10" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
                </svg>
            </button>
        </div>
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

    #deleteButton {
        color: #1E1E1E;
        background-color: #D9D9D9;
    }

    #deleteButton svg path {
        fill: #1E1E1E;
    }

    #deleteButton.disable-submit {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    #deleteButton.disable-submit svg path {
        fill: #1E1E1E80;
    }

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>