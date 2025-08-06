<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";
    import { modal } from "$lib/shared_state/shared.svelte";

    let { data, form } = $props();

    let name = $state("");
    let category = $state("");
    let collection = $state("");
    let price = $state("");
    let alt_desc = $state("");
    let description = $state();

    let enableSubmit = $derived.by(() => {
        if (name && price && alt_desc && category && description){
            return true;
        }

        return false;
    })
</script>

<AdminBackButton link="/admin/settings/products/update" name="Products List" />

<section>
    <form action="?/submit" method="POST">
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
            <label for="description">description:</label>
            <input 
                type="text"
                name="description"
                id="description"
                bind:value={description}
            >
        </p>
        <p>
            <label for="alt_desc">product image description:</label>
            <input 
                type="text"
                name="alt_desc"
                id="alt_desc"
                bind:value={alt_desc}
            >
        </p>
        <p>
            <label for="category_id">category:</label>
            <select 
                name="category_id"
                id="category_id"
                bind:value={category}
            >
            {#each data.categories as category}
                <option value={category.category_id}>
                    {category.category_name}
                </option>
            {/each}
            </select>
        </p>
        <p>
            <label for="collection_id">collection:</label>
            <select
                name="collection_id"
                id="collection_id"
                bind:value={collection}
            >
            {#each data.collections as collection}
                <option value={collection.collection_id}>
                    {collection.collection_name}
                </option>
            {/each}
            <option value={null}>No Collection</option>
            </select>
        </p>
        <p>
            <label for="price">price:</label>
            <input 
                type="text"
                name="price"
                id="price"
                bind:value={price}
            >
        </p>
        <div>
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

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>