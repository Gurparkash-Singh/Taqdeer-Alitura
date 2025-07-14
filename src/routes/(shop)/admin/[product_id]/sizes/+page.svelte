<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";
    import { modal } from "$lib/shared_state/shared.svelte";

    let { data, form } = $props();

    let selectedSize = $state("Add");

    let newName = $state("");
    let abbreviation = $state("");
    let quantity = $state("");

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (form.invalid) {
            selectedSize = form.size_id > 0 ? form.size_id : "Add"
            newName = form.size_name;
            abbreviation = form.size_abbr;
            quantity = form.quantity;
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

    let submitValue = $derived.by(() => {
        if (selectedSize == "Add") {
            return "Add";
        }
        return "Update";
    });

    let enableSubmit = $derived.by(() => {
        if (selectedSize == "Add"){
            if (newName && abbreviation && quantity) {
                return true;
            }
        }

        for (let i = 0; i < data.sizes.length; i++) {
            if (data.sizes[i].size_id == selectedSize) {
                if (newName && data.sizes[i].size_name != newName) {
                    return true;
                }

                if (abbreviation && data.sizes[i].size_abbreviation != abbreviation) {
                    return true;
                }

                if (quantity && data.sizes[i].quantity != quantity) {
                    return true;
                }
            }
        }

        return false;
    });

    let enableDelete = $derived.by(() => {
        for (let i = 0; i < data.sizes.length; i++) {
            if (data.sizes[i].size_id == selectedSize) {
                return true;
            }
        }

        return false;
    })

    $effect(() => {
        if (selectedSize == "Add"){
            newName = "";
            abbreviation = "";
            quantity = "";
        }
        else {
            for (let i = 0; i < data.sizes.length; i++) {
                if (data.sizes[i].size_id == selectedSize) {
                    newName = data.sizes[i].size_name;
                    abbreviation = data.sizes[i].size_abbreviation;
                    quantity = data.sizes[i].quantity;
                }
            }
        }
    })
</script>

<AdminBackButton 
    link={`./`} 
    name={`${data.product.name} Panel`}
/>

<section>
    <form action="?/submit" method="POST">
        <p>
            <label for="currentSize">Size:</label>
            <select 
                name="currentSize"
                id="currentSize"
                bind:value={selectedSize}
            >
                {#each data.sizes as size}
                    <option value={size.size_id}>
                        {size.size_name}
                    </option>
                {/each}
               <option value="Add">Add New Size</option>
            </select>
        </p>
        <p>
            <label for="size_name">size name:</label>
            <input 
                type="text"
                name="size_name"
                id="size_name"
                bind:value={newName}
            >
        </p>
        <p>
            <label for="size_abbr">size abbreviation:</label>
            <input 
                type="text"
                name="size_abbr"
                id="size_abbr"
                bind:value={abbreviation}
            >
        </p>
        <p>
            <label for="quantity">quantity:</label>
            <input 
                type="text"
                name="quantity"
                id="quantity"
                bind:value={quantity}
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
        <div>
            <a href="./sizes/size-chart">update size chart</a>
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