<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";

    let {data} = $props();

    class Product {
        #product_modifiers = $state({});
        #product_items = $state({});
        #selected_item = $state(null);

        constructor() {
            for (let i = 0; i < data.product_variations.length; i++) {
                const variation = data.product_variations[i].id;
                this.#product_items[variation] = {};
            }

            for (let i = 0; i < data.product_items.length; i++){
                const product_item = data.product_items[i];
                for (let variation in product_item.variations) {
                    const option_id = product_item.variations[variation];

                    if (!this.#product_items[variation][option_id]) {
                        this.#product_items[variation][option_id] = [];
                    }

                    this.#product_items[variation][option_id].push(product_item);
                }

                if (!this.#selected_item) {
                    this.#selected_item = product_item;
                }
            }

            if (!this.selected_item) {
                return;
            }

            for (let variation in this.selected_item.variations) {
                this.product_modifiers[variation] = this.selected_item.variations[variation];
            }
		}

        get product_modifiers() {
            return this.#product_modifiers;
        }

        update_modifiers(variation_id, option_id) {
            if (!this.#product_items[variation_id]){
                return;
            }

            if (!this.#product_items[variation_id][option_id]) {
                return;
            }

            if (this.#product_items[variation_id][option_id].length === 0) {
                return;
            }

            this.#product_modifiers[variation_id] = option_id;

            let selected_array = this.#product_items[variation_id][option_id];

            for (let i = 0; i < selected_array.length; i++) {
                let found = true;
                for (let variation in selected_array[i].variations) {
                    if (!this.product_modifiers[variation]){
                        found = false;
                        break;
                    }

                    const option = selected_array[i].variations[variation];

                    if (this.product_modifiers[variation] != option) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    this.#selected_item = selected_array[i];
                    break;
                }
            }
        }

        get product_items() {
            return this.#product_items;
        }

        get selected_item() {
            return this.#selected_item;
        }
    }

    let selection = new Product();
</script>

<AdminBackButton 
    link={`./`} 
    name={`${data.product.name} Panel`}
/>

<section>
    <section class="product-modifier">
        {#each data.product_variations as variation}
        <h3>{variation.name}</h3>
            <div
                class="options-selector"
                style:flex-basis="100%"
            >
                {#each data.product_variation_options as option}
                    {#if variation.id === option.variation_id}
                        <button
                            class:selected={selection.product_modifiers[option.variation_id] === option.option_id}
                            onclick={() => {
                                selection.update_modifiers(
                                    option.variation_id, 
                                    option.option_id
                                )
                            }}
                        >
                            {option.value}
                        </button>
                    {/if}
                {/each}
            </div>
        {/each}
    </section>
</section>

<style>
    .product-modifier {
        display: flex;
        flex-direction: row;
        justify-content: center;
        row-gap: 10px;
        align-items: center;
        flex-wrap: wrap;
    }

    .product-modifier button {
        display: inline-flex;
        background-color: #D9D9D9;
        border: none;
        padding: 16px 20px;
        cursor: pointer;
        width: 50px;
        justify-content: center;
    }

    .options-selector {
        display: flex;
        align-items: center;
        justify-content: center;
        row-gap: 10px;
        column-gap: 10px;
        margin: 0 10px;
    }

    .options-selector .selected {
        color: white;
        background-color: #BF1E2E;
    }
</style>