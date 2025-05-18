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
        {#if product.image_link}
            {#await import(`$lib/images/product_images/${product.image_link}.png`) then { default: src }}
                <a href="/shop/{product.product_id}">
                    <img {src} alt={product.alt_desc} />
                </a>
            {/await}
        {/if}
    </section>
    <section id="details">
        <p>
            {product.size_name}
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