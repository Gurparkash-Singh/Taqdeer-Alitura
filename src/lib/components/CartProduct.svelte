<script>
    import { numberFormat } from "$lib/shared_state/shared.svelte";
    
    let {product} = $props();

    const floatPrice = $derived(parseFloat(product.price) * numberFormat.conversion_rate);

    let price = $derived(floatPrice.toLocaleString(
        numberFormat.area,
        numberFormat.style,
    ));
</script>

<article class="product-card">
    <form action="?/remove" method="POST">
        <input type="hidden" name="item_id" value={product.item_id}>
        <button class="remove-button" aria-label="Remove Item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </button>
    </form>
    <section id="product-info">
        <div>
            <h3>{product.name}</h3>
        </div>
        {#if product.image_link}
            <a href="/shop/{product.product_id}">
                <img 
                    src={`${product.image_link}`} 
                    alt={product.alt_desc} 
                />
            </a>
        {/if}
    </section>
    <p>
        {#if product.variations}
            {#if product.variations.Size}
                {product.variations.Size}
            {:else}
                N/A
            {/if}
        {:else}
            N/A
        {/if}
    </p>
    <p>
        x{product.quantity}
    </p>
    <p>{price}</p>
</article>

<style>
    .product-card {
        display: grid;
        grid-template-columns: 90px 1fr 1fr 1fr;
        position: relative;
        align-items: center;
        margin-left: 10px;
        justify-items: center;
    }

    .product-card section:nth-child(2) {
        justify-self: start;
    }

    .product-card img {
        inline-size: 90px;
        object-fit: contain;
        height: 90px;
    }

    .product-card h3 {
        font-weight: normal;
        font-size: 1em;
        margin: 0;
    }

    form {
        position: absolute;
        top: 50%;
        left: -20px;
    }

    button {
        background-color: transparent;
        border: none;
    }

    .remove-button:hover {
        scale: 120%;
        cursor: pointer;
    }

    #product-info div {
        display: flex;
        flex-direction: column;
    }

    @media screen and (width < 400px) {
        .product-card {
            font-size: 9pt;
        }
    }
</style>
