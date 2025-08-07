<script>
    import { numberFormat } from "$lib/shared_state/shared.svelte";
    
    let {product} = $props();

    const floatPrice = $derived(parseFloat(product.price) * numberFormat.conversion_rate);

    let price = $derived(floatPrice.toLocaleString(
        numberFormat.area,
        numberFormat.style,
    ));
</script>

<article>
    <section id="title">
        <h3>{product.name}</h3>
        {#if product.small_image}
            <a href="/shop/{product.product_id}">
                <img src={`${product.small_image}`} alt={product.alt_desc} />
            </a>
        {/if}
    </section>
    <section id="details">
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
    </section>
</article>

<style>
    article {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 225px;
    }

    img {
        inline-size: 90px;
        object-fit: contain;
        height: 90px;
    }

    h3 {
        font-weight: normal;
        font-size: 1em;
        margin: 0;
    }
</style>