<script>
    import { modal } from '$lib/shared_state/shared.svelte';
    import ImageModal from '$lib/components/ImageModal.svelte';
    import { numberFormat } from '$lib/shared_state/shared.svelte';

    let { data, form } = $props();

    class Product {
        #product_modifiers = $state({});
        #product_items = $state({});
        #quantity = $state(0);
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

                    if (product_item.quantity > 0) {
                        this.#product_items[variation][option_id].push(product_item);
                    }
                }

                if (!this.#selected_item) {
                    if (product_item.quantity > 0) {
                        this.#selected_item = product_item;
                    }
                }
            }

            if (!this.selected_item) {
                return;
            }

            for (let variation in this.selected_item.variations) {
                this.product_modifiers[variation] = this.selected_item.variations[variation];
            }
		}

        get quantity() {
			return this.#quantity;
		}

        set quantity(value) {
            const max_quantity = Math.min(5, this.#selected_item.quantity);
            this.#quantity = Math.max(0, Math.min(max_quantity, value));
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
                    this.#quantity = 0;
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

    // For Images and image modal
    let images = [];
    let display = $state(false);
    let currentImage = $state(0);
    let showImage = $derived(images[currentImage]);
    let touchStartX = $state(0);
    let touchEndX = $state(0);
    let body;

    // For Price
    let floatPrice = $derived.by(() => {
        const tempPrice = parseFloat(data.product.default_price)
        return tempPrice * numberFormat.conversion_rate;
    });

    let price = $derived(floatPrice.toLocaleString(
        numberFormat.area,
        numberFormat.style
    ));

    // For product variations if there are more than 1
    let product_variations = $state([]);

    // grid template columns for all option selectors
    let templateColumns = $state(0);
    let templateDictionary = $state({});

    // For collapsable sections
    let openInfo = $state(false);
    let openSize = $state(false);
    let openReturn = $state(false);

    let sizeChartUnit = $state(0);

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

    for (let i = 0; i < data.images.length; i++) {
        images.push(data.images[i].image_id);
    }

    for (let i = 1; i < data.product_variations.length; i++) {
        product_variations.push(data.product_variations[i]);
    }

    function calculateTemplateColumns() {
        templateDictionary = {};
        
        for (let i = 0; i < data.product_variation_options.length; i++){
            const currentVariation = data.product_variation_options[i].variation_id;
            if (templateDictionary[currentVariation]) {
                templateDictionary[currentVariation] += 1;
            }
            else {
                templateDictionary[currentVariation] = 1;
            }
        }

        let currentId;

        if (data.product_variations.length > 0) {
            currentId = data.product_variations[0].id;
            templateColumns = templateDictionary[currentId];
        }
    }

    function nextImage() {
        currentImage = (currentImage + 1) % images.length;
    }

    function prevImage() {
        currentImage = (currentImage - 1);
        if (currentImage == -1) {
            currentImage = images.length - 1;
        }
    }

    $effect(() => {
        if (display) {
            body.style.overflow = "hidden";
        }
        else {
            body.style.overflow = "auto";
        }
    })

    calculateTemplateColumns();
</script>

<svelte:body bind:this={body}/>

<ImageModal 
    data={data}
    display={display}
    closeDisplay={() => {
        display = false;
    }} 
    selectImage={currentImage}
/>

<section id="product">
    <div 
        id="image-carousel"
        ontouchstart={(e) => {
            touchStartX = e.changedTouches[0].screenX;
        }}
        ontouchend={(e) => {
            touchEndX = event.changedTouches[0].screenX;
            if (touchEndX < touchStartX) {
                nextImage();
            }
            if(touchEndX > touchStartX) {
                prevImage();
            }
        }}
    >
        <button 
            aria-label="previous image"
            onclick={prevImage}
            class:oneImage={data.images.length <= 1}
        >
            <svg width="20" height="30" viewBox="0 0 34 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.17157 27.1716C-0.390524 28.7337 -0.390524 31.2663 1.17157 32.8284L26.6274 58.2843C28.1895 59.8464 30.7222 59.8464 32.2843 58.2843C33.8464 56.7222 33.8464 54.1895 32.2843 52.6274L9.65685 30L32.2843 7.37258C33.8464 5.81049 33.8464 3.27783 32.2843 1.71573C30.7222 0.153632 28.1895 0.153632 26.6274 1.71573L1.17157 27.1716ZM7 26H4L4 34H7L7 26Z" fill="#1E1E1E"/>
            </svg>
        </button>
        {#each data.images as image}
            <button 
                class="carousel-holder"
                class:showImage={image.image_id == showImage}
                onclick={() => {
                    display = true;
                }}
                aria-label="Full Screen Image"
            >
                <picture>
                    <source 
                        media="(min-width:640px)" 
                        srcset={image.large_image}
                    >
                    <source 
                        media="(min-width:320px)" 
                        srcset={image.medium_image}
                    >
                    <img 
                        src={`${image.image_link}`} 
                        alt={image.alt_desc}
                    >
                </picture>
            </button>
        {/each}
        <button 
            aria-label="next image"
            onclick={nextImage}
            class:oneImage={data.images.length <= 1}
        >
            <svg width="20" height="30" viewBox="0 0 34 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.8284 32.8284C34.3905 31.2663 34.3905 28.7337 32.8284 27.1716L7.37258 1.71573C5.81049 0.153631 3.27783 0.153631 1.71573 1.71573C0.153631 3.27783 0.153631 5.81049 1.71573 7.37258L24.3431 30L1.71573 52.6274C0.153631 54.1895 0.153631 56.7222 1.71573 58.2843C3.27783 59.8464 5.81049 59.8464 7.37258 58.2843L32.8284 32.8284ZM26 34H30V26H26V34Z" fill="#1E1E1E"/>
            </svg>
        </button>
    </div>

    <div id="product-name-holder">
        <h1 id="product-name">{data.product.name}</h1>
        <p id="product-price">{price}</p>
        {#if data.outOfStock}
            <p style:text-align="center">Out of Stock</p>
        {/if}
    </div>

    <section class="product-modifier">
        {#each product_variations as variation}
            <div
                class="options-selector"
                style:flex-basis="100%"
            >
                {#each data.product_variation_options as option}
                    {#if variation.id === option.variation_id}
                        {#if !selection.product_items[option.variation_id][option.option_id]}
                            <button
                            class="disabled"
                            >
                                {option.value}
                            </button>
                        {:else if selection.product_items[option.variation_id][option.option_id].length === 0}
                            <button
                                class="disabled"
                            >
                                {option.value}
                            </button>
                        {:else}
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
                    {/if}
                {/each}
            </div>
        {/each}
        <div
            id="size-selector"
            style:grid-template-columns={`repeat(${templateColumns + 1}, 1fr)`}
        >
            <div id="quantity-slider">
                <button 
                    onclick={() => {
                        selection.quantity = selection.quantity + 1;
                    }}
                    id="quantity-up"
                    aria-label="increase quantity"
                >
                    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0607 0.93934C12.4749 0.353553 11.5251 0.353553 10.9393 0.93934L1.3934 10.4853C0.807611 11.0711 0.807611 12.0208 1.3934 12.6066C1.97919 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.93934ZM13.5 3V2L10.5 2V3L13.5 3Z" fill="#D9D9D9"/>
                    </svg>
                </button>
                <p id="quantity-displayer">{selection.quantity}</p>
                <button 
                    onclick={() => {
                        selection.quantity = selection.quantity - 1;
                    }}
                    id="quantity-down"
                    aria-label="decrease quantity"
                >
                    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807612 21.0711 0.807612 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807612 1.97918 0.807612 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 10V12H13.5V10H10.5Z" fill="#D9D9D9"/>
                    </svg> 
                </button>
            </div>

            {#if data.product_variations.length >= 1}
                {#each data.product_variation_options as option}
                    {#if option.variation_id === data.product_variations[0].id}
                        {#if !selection.product_items[option.variation_id][option.option_id]}
                            <button
                            class="disabled"
                            >
                                {option.value}
                            </button>
                        {:else if selection.product_items[option.variation_id][option.option_id].length === 0}
                            <button
                                class="disabled"
                            >
                                {option.value}
                            </button>
                        {:else}
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
                    {/if}
                {/each}
            {/if}
        </div>
        <form 
            method="POST" 
            action="?/add" 
            id="cart-button"
        >
            <input type="hidden" name="quantity" value={selection.quantity}/>
            <input 
                type="hidden" 
                name="item" 
                value={selection.selected_item ? selection.selected_item.item_id : 0}
            />
            <button
                class:disabled={selection.quantity === 0}
                disabled={selection.quantity === 0}
            >
                Add to cart
            </button>
        </form>
    </section>

    <button 
        aria-label="toggle section"
        class="section-button"
        class:open-button={!openInfo}
        id="info-button"
        onclick={() => {
            openInfo = !openInfo;
        }}
    >
        Product Info
    </button>
    <section 
        class="collapsable" 
        id="info"
        class:open-section={openInfo}
    >
        {#if data.components.length == 1}
            {#each data.properties as property}
                {#if property.property_value}
                    <p>
                        {property.property_name}: {property.property_value}
                    </p>
                {:else}
                    <p>{property.property_name}</p>
                {/if}
            {/each}
        {:else}
            {#each data.components as component}
                <h3>{component.component_name}</h3>
                {#each data.properties as property}
                    {#if property.component_id == component.component_id}
                        {#if property.property_value}
                            <p>
                                {property.property_name}: {property.property_value}
                            </p>
                        {:else}
                            <p>{property.property_name}</p>
                        {/if}
                    {/if}
                {/each}
            {/each}
        {/if}
    </section>

    <button 
        aria-label="toggle section"
        class="section-button"
        class:open-button={!openSize}
        onclick={() => {
            openSize = !openSize;
        }}
    >
        Sizing Information
    </button>
    <section 
        class="collapsable"
        id="size"
        class:open-section={openSize}
    >
        {#if data.product.size_chart_above_text}
            <p>{data.product.size_chart_above_text}</p>
        {:else}
            <div
                style:height="14px"
            ></div>
        {/if}

        <div id="table-buttons">
            <button 
                id="convert_to_cm"
                class:selected={sizeChartUnit === 0}
                onclick={(e) => {sizeChartUnit = 0;}}
            >
                cm
            </button>
            <button 
                id="convert_to_inches"
                class:selected={sizeChartUnit === 1}
                onclick={(e) => {sizeChartUnit = 1;}}
            >
                in
            </button>
        </div>
        <table
            style:display={sizeChartUnit === 0 ? "block" : "none"}
        >
            <thead>
                <tr>
                    <th>Size</th>
                    {#each data.size_chart_components as component}
                        <th>{component.name}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each data.size_chart_values as components_array}
                    <tr>
                        <th>
                            {
                                components_array.length > 0 ? 
                                components_array[0].size : null
                            }
                        </th>
                        {#each components_array as component}
                            <td>{component.value}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>

        <table
            style:display={sizeChartUnit === 1 ? "block" : "none"}
        >
            <thead>
                <tr>
                    <th>Size</th>
                    {#each data.size_chart_components as component}
                        <th>{component.name}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each data.size_chart_values as components_array}
                    <tr>
                        <th>
                            {
                                components_array.length > 0 ? 
                                components_array[0].size : null
                            }
                        </th>
                        {#each components_array as component}
                            {@const inch_value = Number(component.value) / 2.54}
                            <td>{inch_value.toFixed(2)}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>

        {#if data.product.size_chart_below_text}
            <p>{data.product.size_chart_below_text}</p>
        {:else}
            <div
                style:height="14px"
            ></div>
        {/if}
    </section>

    <button 
        aria-label="toggle section" 
        class="section-button"
        class:open-return-button={!openReturn}
        onclick={() => {
            openReturn = !openReturn;
        }}
    >
        Return Policy
    </button>
    <section 
        class="collapsable"
        id="return"
        class:open-section={openReturn}
    >
        <p>For return or exchanges, please contact support</p>
    </section>
</section>

<style>
    #product {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #image-carousel {
        display: flex;
		justify-content: center;
        position: relative;
        height: 400px;
        flex-direction: row;
    }

    #image-carousel button.carousel-holder {
        display: none;
        justify-content: center;
        max-width: 400px;
        position: relative;
        top: 0;
    }

    .carousel-holder img {
        width: 100%;
        object-fit: contain;
        max-height: 100%;
    }

    #image-carousel button.showImage {
        display: flex;
    }

    #image-carousel > button {
        background-color: transparent;
        border: none;
        top: calc(50% - 14px);
        position: absolute;
    }

    .oneImage svg path{
        fill: #D9D9D9;
    }

    button[aria-label="previous image"] {
        left: 0%;
    }

    button[aria-label="next image"] {
        right: 0%;
    }

    #product-name-holder {
        position: relative;
    }

    #product-name {
        text-align: center;
    }

    #product-price {
        text-align: center;
    }

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

    #size-selector {
        display: inline-grid;
        align-items: center;
        justify-items: center;
        row-gap: 10px;
        column-gap: 10px;
        margin: 0 10px;
    }

    .options-selector .selected, #size-selector .selected {
        color: white;
        background-color: #BF1E2E;
    }

    .options-selector .disabled, #size-selector .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    #quantity-slider {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #quantity-slider button {
        background-color: transparent;
        border: none;
        padding: 0;
    }

    #quantity-slider p {
        background-color: #D9D9D9;
        padding: 16px;
        text-align: center;
        width: 50px;
    }

    #cart-button button {
        color: white;
        background-color: #BF1E2E;
        width: 110px;
    }

    #cart-button button.disabled {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    .collapsable {
        font-size: 14px;
        padding: 0 30px;
        display: none;
        flex-direction: column;
        border-bottom: 1px solid grey;
    }

    .section-button {
        background-color: transparent;
        border: none;
        font-size: 1.2em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0;
        margin-top: 20px;
    }

    .section-button::before {
        content: url("/arrow.svg");
        font-size: 20px;
        position: relative;
        top: 2px;
        margin-right: 10px;
    }

    #info-button {
        margin-top: 50px;
    }

    #info h3 {
        font-weight: normal;
    }

    #return {
        margin-bottom: 100px;
    }

    .open-section {
        display: flex;
    }

    .open-button {
        border-bottom: 1px solid grey;
    }

    .open-return-button {
        margin-bottom: 100px;
        border-bottom: 1px solid grey;
    }

    table {
        text-align: left;
    }

    th {
        font-size: 9pt;
    }

    td {
        font-size: 8pt;
    }

    #table-buttons {
        display: flex;
    }

    #table-buttons button {
        display: inline-flex;
        background-color: #D9D9D9;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        justify-content: center;
        font-size: 9pt;
        width: 35px;
    }

    #table-buttons .selected {
        color: white;
        background-color: #BF1E2E;
    }

    #convert_to_inches {
        margin-right: 5px
    }

    @media screen and (width < 650px) {
        .carousel-holder {
            width: min(400px, 75%);
        }

        #image-carousel {
            min-height: min(500px, calc(80vw * 0.75));
        }
    }
</style>