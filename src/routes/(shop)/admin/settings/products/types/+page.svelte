<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";
    import { modal } from "$lib/shared_state/shared.svelte";

    let { data, form } = $props();

    let selectedType = $state("Add");

    let newName = $state("");
    let parentType = $state(null);

    let submitValue = $derived.by(() => {
        if (selectedType == "Add") {
            return "Add";
        }
        return "Update";
    });

    let enableSubmit = $derived.by(() => {
        if (selectedType == "Add" && newName){
            return true;
        }

        for (let i = 0; i < data.product_types.length; i++) {
            if (data.product_types[i].id == selectedType) {
                if (data.product_types[i].name != newName) {
                    return true;
                }
            }
        }

        return false;
    });

    let enableDelete = $derived.by(() => {
        for (let i = 0; i < data.product_types.length; i++) {
            if (data.product_types[i].id == selectedType) {
                return true;
            }
        }

        return false;
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

    $effect(() => {
        if (selectedType == "Add"){
            newName = "";
        }
        else {
            for (let i = 0; i < data.product_types.length; i++) {
                if (data.product_types[i].id == selectedType) {
                    newName = data.product_types[i].name;
                }
            }
        }
    })
</script>

<AdminBackButton link="/admin/settings/products" name="Products Panel" />

<section>
    <form action="?/submit" method="POST">
        <p>
            <label for="currentType">type:</label>
            <select 
                name="currentType"
                id="currentType"
                bind:value={selectedType}
            >
                {#each data.product_types as type}
                    <option value={type.id}>
                        {type.name}
                    </option>
                {/each}
               <option value="Add">Add New Type</option>
            </select>
        </p>
        <p>
            <label for="type_name">type name:</label>
            <input 
                type="text"
                name="type_name"
                id="type_name"
                bind:value={newName}
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